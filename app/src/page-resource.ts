/**
 * 页面资源集合，请不要在主进程中引用
 */

// common
export const NoMatch = import('./views/common/no-match')
export const AlertModal = import('./views/common/alert-modal')

// 设为 undefined 将不会创建路由，一般用于重定向

export const Home = import('./views/home/home')
export const Report = import('./views/report/report')
export const ImportingBills = import('./views/importing-bills/importing-bills')
export const Accounting = import('./views/accounting/accounting')
export const About = import('./views/about/about')
