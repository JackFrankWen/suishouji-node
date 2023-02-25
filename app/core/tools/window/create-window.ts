import path from 'path'
import { BrowserWindow, BrowserWindowConstructorOptions, ipcMain } from 'electron'
import fs from 'fs'
import { enable as enableRemote } from '@electron/remote/main'
import csv from 'csv'
import { log } from '../log'
import routes from '@/src/auto-routes'

const { NODE_ENV, port, host } = process.env

/** 创建新窗口相关选项 */
export interface CreateWindowOptions {
  /** 路由启动参数 */
  params?: Record<string, any>
  /** URL 启动参数 */
  query?: Record<string, any>
  /** BrowserWindow 选项 */
  windowOptions?: BrowserWindowConstructorOptions
  /** 窗口启动参数 */
  createConfig?: CreateConfig
}

/** 已创建的窗口列表 */
export const windowList: Map<RouteName, BrowserWindow> = new Map()

/**
 * 通过 routes 中的 key(name) 得到 url
 * @param key
 */
export function getWindowUrl(key: RouteName, options: CreateWindowOptions = {}): string {
  let routePath = routes.get(key)?.path

  if (typeof routePath === 'string' && options.params) {
    routePath = routePath.replace(/\:([^\/]+)/g, (_, $1) => {
      return options.params?.[$1]
    })
  }

  const query = options.query ? $tools.toSearch(options.query) : ''

  if (NODE_ENV === 'development') {
    return `http://${host}:${port}#${routePath}${query}`
  } else {
    return `file://${path.join(__dirname, '../renderer/index.html')}#${routePath}${query}`
  }
}

/**
 * 创建一个新窗口
 * @param key
 * @param options
 */
export function createWindow(key: RouteName, options: CreateWindowOptions = {}): Promise<BrowserWindow> {
  return new Promise((resolve) => {
    const routeConfig: RouteConfig | AnyObj = routes.get(key) || {}

    const windowOptions: BrowserWindowConstructorOptions = {
      ...$tools.DEFAULT_WINDOW_OPTIONS, // 默认新窗口选项
      ...routeConfig.windowOptions, // routes 中的配置的window选项
      ...options.windowOptions, // 调用方法时传入的选项
    }

    const createConfig: CreateConfig = {
      ...$tools.DEFAULT_CREATE_CONFIG,
      ...routeConfig.createConfig,
      ...options.createConfig,
    }

    if (createConfig.showCustomTitlebar) {
      windowOptions.frame = false
    }

    let activeWin: BrowserWindow | boolean
    if (createConfig.single) {
      activeWin = activeWindow(key)
      if (activeWin) {
        resolve(activeWin)
        return activeWin
      }
    }

    const win = new BrowserWindow(windowOptions)
    ipcMain.on('sendMessage', (event, args) => {
      console.log('收到渲染进程的消息', event, args)
      win.webContents.send('receiveMessage', '我是主进程已收到消息' + args)
    })
    ipcMain.handle('get-file-contents', (event, filePath) => {
      fs.createReadStream(filePath)
        .pipe(csv.parse())
        .on('data', function (csvrow) {
          console.log(csvrow, 'yoyoyo')
          //do something with csvrow
        })
        .on('end', function () {
          //do something with csvData
        })
      return fs.readFileSync(filePath, 'utf-8')
    })

    const url = getWindowUrl(key, options)
    windowList.set(key, win)
    win.loadURL(url)

    if (createConfig.saveWindowBounds) {
      const { rect } = $tools.settings.windowBounds.get(key) || {}
      if (rect) win.setBounds(rect)
      // if (maximized) win.maximize()
    }

    if (createConfig.hideMenus) win.setMenuBarVisibility(false)
    if (createConfig.created) createConfig.created(win)

    enableRemote(win.webContents)

    win.webContents.on('dom-ready', () => {
      win.webContents.send('dom-ready', createConfig)
    })

    win.webContents.on('did-finish-load', () => {
      if (createConfig.autoShow) {
        if (createConfig.delayToShow) {
          setTimeout(() => {
            win.show()
          }, createConfig.delayToShow)
        } else {
          win.show()
        }
      }
      resolve(win)
    })

    win.once('ready-to-show', () => {
      if (createConfig.openDevTools) win.webContents.openDevTools()
    })

    win.once('show', () => {
      log.info(`Window <${key}:${win.id}> url: ${url} opened.`)
    })

    win.on('close', () => {
      if (createConfig.saveWindowBounds && win) {
        const maximized = win.isMaximized()
        const rect = maximized ? $tools.settings.windowBounds.get(key)?.rect : win.getBounds()
        $tools.settings.windowBounds.set(key, { rect, maximized })
      }
      windowList.delete(key)
      log.info(`Window <${key}:${win.id}> closed.`)
    })
  })
}

/**
 * 激活一个已存在的窗口, 成功返回 BrowserWindow 失败返回 false
 * @param key
 */
export function activeWindow(key: RouteName): BrowserWindow | false {
  const win: BrowserWindow | undefined = windowList.get(key)

  if (win) {
    win.show()
    return win
  } else {
    return false
  }
}
