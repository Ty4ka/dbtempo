import _ from 'lodash'
import { LowDbBase } from './baseLowDb'

type TKeyValue = {
  [key: string]: any
}

class LowDbKv extends LowDbBase<TKeyValue> {
  async read() {
    await this.db.read()
    this.db.data ||= {}
  }

  async add(kv: { [key: string]: any }) {
    try {
      await this.read()
      for (const key in kv) {
        if (kv.hasOwnProperty(key)) {
          this.db.data![key] = kv[key]
        }
      }

      await this.save()
    } catch {}
  }

  async get(key: string) {
    try {
      await this.read()
      return this.db.data![key]
    } catch {}

    return null
  }

  async find(fieldname: string, value: any) {
    try {
      await this.read()

      const { data } = this.db
      for (const key in data) {
        try {
          if (
            data.hasOwnProperty(key) &&
            data[key].hasOwnProperty(fieldname) &&
            data[key][fieldname] === value
          ) {
            return data[key]
          }
        } catch {}
      }
    } catch {}

    return null
  }
}

export { LowDbKv }
