import axios from "axios";
import Abstract from "models/Abstract/Abstract";
import HostService from "services/HostService";

const host = new HostService().getHost()


export default class ApiModel extends Abstract{
  constructor(id) {
    super()
    this.id = id
    this.mustDefineStatic('fromObject')
    this.mustDefineStatic('endpoint')
  }

  static fromObjects(array){
    return array.map((rawObject) => this.prototype.fromObject(rawObject))
  }

  static fetch(id, success){
    this._get((rawObj) => success(this.fromObject(rawObj)))
  }

  static fetchAll(success){
    this._get((array) => success(this.fromObjects(array)))
  }
  
  static _get(endpoint, success){
    axios
      .get(`${host}/${endpoint}`).then(res => {
      console.log(res.data);
      success(res.data);
    }).catch(err => console.log(err));
  }
}
