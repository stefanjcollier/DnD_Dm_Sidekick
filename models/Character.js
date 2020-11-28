import ApiModel from "models/Abstract/ApiModel"
import Reputation from "models/Reputation";

export default class Character extends ApiModel {
  constructor (id, name, charisma_modifier, reputation) {
    super(id);
    this.name = name
    this.charisma_modifier = charisma_modifier
    this.reputation = reputation
  }

  static endpoint(){
    return 'api/characters'
  }

  static fromObject(obj) {
    const reputation = Reputation.fromObject(obj.reputation)
    return new Character(obj.id, obj.name, obj.charisma_modifier, reputation)
  }

}