import { MenuItemConstructorOptions } from 'electron'

export const trayMenus: MenuItemConstructorOptions[] = [
  {
    label: '主页',
    click: (): void => {
      $tools.createWindow('Home')
    },
  },
]
