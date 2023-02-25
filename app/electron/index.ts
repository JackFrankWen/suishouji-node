import { initMain } from '@/core/main.init'

async function startApp() {
  console.log('== start  here')
  await initMain()
  await import('./main')
}

startApp()
