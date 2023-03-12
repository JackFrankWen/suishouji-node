import { initMain } from '@/core/main.init'
import { runMongodb } from '@/core/api/mongodb/db'

async function startApp() {
  await initMain()
  await import('./main')
  await runMongodb()
  console.log('== start  here')
}

startApp().catch((err) => console.log(err))
