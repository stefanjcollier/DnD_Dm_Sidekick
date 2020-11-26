export default class DiscountService {

  KEY_TO_BONUS = {
    "-5": 1.1,
    "-4": 1.08,
    "-3": 1.05,
    "-2": 1.03,
    "-1": 1.02,
    "0": 1,
    "1": 0.98,
    "2": 0.95,
    "3": 0.93,
    "4": 0.90,
    "5": 0.85,
  }

  REPUTATIONS = [
    "Villain", "Enemy", "Hated", "Reviled", "Disliked",
    "Stranger",
    "Known", "Liked", "Renowned", "Honored", "Legendary"
  ]

  REPUTATION_TO_KEY = {
    Villain:   "-5",
    Enemy:     "-4",
    Hated:     "-3",
    Reviled:   "-2",
    Disliked:  "-1",
    Stranger:  "0",
    Known:     "1",
    Liked:     "2",
    Renowned:  "3",
    Honored:   "4",
    Legendary: "5",
  }

  constructor() {}

  modifier(charisma, reputation) {
    const charismaMod = this.KEY_TO_BONUS[charisma.toString()]
    const reputationMod = this.KEY_TO_BONUS[this.REPUTATION_TO_KEY[reputation]]
    return charismaMod * reputationMod
  }


}