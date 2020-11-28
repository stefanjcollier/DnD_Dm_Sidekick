export default class Reputation {
  constructor(id, name, description) {
    this.id  = id
    this.name = name
    this.description = description
  }

  static fromObject(obj){
    return new Reputation(obj.id, obj.name, obj.description)
  }
  static fromObjects(array){
    return array.map((rawReputation) => Reputation.fromObject(rawReputation))
  }

}