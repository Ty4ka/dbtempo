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
      Object.keys(kv).forEach((key) => {
        this.db.data![key] = kv[key]
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

      return {
        result: Object.keys(data!).find(
          (key) => data!.hasOwnProperty(key) && data![key].hasOwnProperty(fieldname) && data![key][fieldname] === value
        )
      }
    } catch (error) {
      return { error }
    }
  }
}

export { LowDbKv }
