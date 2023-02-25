const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    windowOptions: {
      title: 'App Home (redirect to demo)',
      width: 1200,
      height: 800,
      minWidth: 800,
      minHeight: 600,
    },
    createConfig: {
      showSidebar: true,
      showCustomTitlebar: true,
      saveWindowBounds: true,
      openDevTools: true,
    },
  },
]

export default routes
