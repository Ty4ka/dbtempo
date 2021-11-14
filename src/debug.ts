import { LowDbBase } from './baseLowDb'
import { LowDbKv } from './lowdbKv'

const debug = async () => {
  const db = new LowDbKv({
    dbName: 'debug'
  })

  await db.add({ a: new Date() })
  const { result } = await db.get('a')
  // debugger
}

debug()
