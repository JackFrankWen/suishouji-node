import { connect } from '@/core/api/mongodb/db'
import { initMain } from '@/core/main.init'

async function startApp() {
  console.log('== start  here')
  await initMain()
  await connect()
  await import('./main')
}

startApp()
