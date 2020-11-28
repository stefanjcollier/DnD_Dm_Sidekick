import axios from "axios";
import Reputation from "models/Reputation";

export default class ReputationService {
  static fetchAll(success_callback) {
    axios
      .get(`${host}/api/reputations/`).then(res => {
      console.log(res.data);
      success_callback(Reputation.fromObjects(res.data));
    }).catch(err => console.log(err));
  }
}