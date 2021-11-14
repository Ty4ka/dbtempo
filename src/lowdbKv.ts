/* tslint:disable:no-empty */
import _ from 'lodash'
import { LowDbBase } from './baseLowDb'

type TKeyValue = {
  [key: string]: any
}

class LowDbKv extends LowDbBase<TKeyValue> {
  async read() {
    try {
      await this.db.read()
      this.db.data ||= {}
    } catch (error: any) {
      return { error }
    }
  }

  async add(kv: { [key: string]: any }) {
    try {
      await this.read()
      Object.keys(kv).forEach((key) => {
        try {
          this.db.data![key] = kv[key]
        } catch {}
      })
      await this.save()

      return { result: true }
    } catch (error) {
      return { error }
    }
  }

  async get(key: string) {
    try {
      await this.read()
      return { result: this.db.data![key] }
    } catch (error) {
      return { error }
    }
  }

  async find(fieldname: string, value: any) {
    try {
      await this.read()

      const { data } = this.db
      if (!data) {
        return { error: 'no data' }
      }

      const findedKey =
        Object.keys(data).find((key) => {
          try {
            if (!data.hasOwnProperty(key) || !data[key].hasOwnProperty(fieldname)) {
              return
            }

            return data[key][fieldname] === value
          } catch {}
        }) || ''

      return { result: data[findedKey] }
    } catch (error) {
      return { error }
    }
  }
}

export { LowDbKv }
