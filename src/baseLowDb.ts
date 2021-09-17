// https://github.com/typicode/lowdb
import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { ensureDirectoryExistence } from 'fs-extreme'

type TLowDbSettings = {
  dbName: string
}

class LowDbBase<T> {
  protected db: Low<T>

  constructor(s: TLowDbSettings) {
    let { dbName } = s
    const d = new Date()
    dbName = dbName
      .replaceAll('{YYYY}', d.getFullYear().toString())
      .replaceAll('{MM}', (d.getMonth() + 1).toString())
      .replaceAll('{DD}', d.getDate().toString())

    const __dirname = dirname(fileURLToPath(import.meta.url))
    const filepath = join(__dirname, 'storage', dbName)
    ensureDirectoryExistence(filepath)
    const adapter = new JSONFile<T>(filepath)
    this.db = new Low<T>(adapter)
  }

  protected async save() {
    try {
      await this.db.write()
    } catch {}
  }
}

export { LowDbBase }
