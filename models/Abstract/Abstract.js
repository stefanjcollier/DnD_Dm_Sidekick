export default class Abstract {
  mustDefine(methodName){
    if (this[methodName] === undefined)
      this._throwNotDefinedError(methodName)
  }

  mustDefineStatic(methodName){
    if (this.constructor[methodName] === undefined)
      this._throwNotDefinedError(methodName)
  }

  _throwNotDefinedError(methodName) {
    console.log(`Missing ${methodName}`)
  }
}