import axios from "axios";
import Abstract from "models/Abstract/Abstract";
import HostService from "services/HostService";

const host = new HostService().getHost()

const DEBUG = true

export default class ApiModel extends Abstract{
  constructor(id) {
    super()
    this.id = id
    this.mustDefineStatic('fromObject')
    this.mustDefineStatic('endpoint')
  }

  static fromObjects(array){
    return array.map((rawObject) => this.fromObject(rawObject))
  }

  static fetch(id, success, error){
    this._get(`${this.normalisedEndpoint()}${id}/`,
      (rawObj) => success(this.fromObject(rawObj)),
      error
    )
  }

  static fetchAll(success, error){
    this._get(this.normalisedEndpoint(),
      (rawObjArray) => success(this.fromObjects(rawObjArray)),
      error
    )
  }

  static normalisedEndpoint() {
    if (this.endpoint().substr(-1) !== '/') {
      return `${this.endpoint()}/`
    } else {
      return this.endpoint()
    }
  }

  static _get(endpoint, success, error){
    const trailing_slash = (endpoint.substr(-1) !== '/') ? '/' : ''
    const url = `${host}/${endpoint}${trailing_slash}`
    axios.get(url).then(res => {
      this._debug(`✅ GET ${url}\nResponse Body:\n`, res.data)
        success(res.data);
    }).catch(err => {
      this._debug(`⛔️ GET ${url}\n`, err)
      console.log(err)
      if (error !== undefined) {
        error(err)
      } else if (DEBUG) {
        const lastUrlChar = endpoint.substr(-2, 1)
        const lastCharIsNum = !isNaN(lastUrlChar)
        alert(`Couldn't fetch ${this.name}${lastCharIsNum ? '' : 's'}`)
      }
    });
  }

  static fetchAllPromise() {
    return new Promise((resolve, reject) => {
      this._promise_get(this.endpoint())
        .then((rawObjArray) => resolve(this.fromObjects(rawObjArray)))
        .catch((error) => reject(error))
    })
  }

  static fetchPromise(id) {
    return new Promise((resolve, reject) => {
      this._promise_get(`${this.endpoint()}/${id}/`)
        .then((rawObj) => resolve(this.fromObject(rawObj)))
        .catch((error) => reject(error))
    })
  }

  static fetchPromise2(id) {
    this._promise_get(`${this.endpoint()}/${id}/`)
      .then((rawObj) => {
        return new Promise((resolve, reject) => {
          resolve(this.fromObject(rawObj))
        })
      })
  }

  static _promise_get(endpoint) {
    return new Promise((resolve, reject) => {
      const url = `${host}/${endpoint}`

      axios.get(url)
        .then(res => {
          this._debug(`✅ GET ${url}\nResponse Body:\n`, res.data)
          resolve(res.data);
        })
        .catch(err => {
        this._debug(`⛔️ GET ${url}\n`, err)
        reject(err)
      })
    })
  }

  static _debug(...messages){
    if (DEBUG) {
      console.log(...messages)
    }
  }
}
