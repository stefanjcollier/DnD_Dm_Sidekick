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
    this._get(`${this.endpoint()}/${id}/`,
      (rawObj) => success(this.fromObject(rawObj)),
      error
    )
  }

  static fetchAll(success, error){
    this._get(this.endpoint(),
      (rawObjArray) => success(this.fromObjects(rawObjArray)),
      error
    )
  }

  static _get(endpoint, success, error){
    const url = `${host}/${endpoint}`
    axios.get(url).then(res => {
      this._debug(`✅ GET ${url}\nResponse Body:\n`, res.data)
        success(res.data);
    }).catch(err => {
      this._debug(`⛔️ GET ${url}\n`, err)
      console.log(err)
      if (error !== undefined) {
        error(err)
      } else if (DEBUG) {
        const lastUrlChar = endpoint.replace(/[/]/g, '').substr(-1)
        const lastCharIsNum = !isNaN(lastUrlChar)
        console.log(lastUrlChar, lastCharIsNum)
        alert(`Couldn't fetch ${this.name}${lastCharIsNum ? '' : 's'}`)
      }
    });
  }

  static _debug(...messages){
    if (DEBUG) {
      console.log(...messages)
    }
  }
}
