const routes: RouteConfig[] = [
  {
    name: 'ImportingBills',
    path: '/importing-bills',
    windowOptions: {
      title: 'About',
      resizable: false,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      width: 300,
      height: 240,
    },
    createConfig: {
      hideMenus: true,
    },
  },
]

export default routes
