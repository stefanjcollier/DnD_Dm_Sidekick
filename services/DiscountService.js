import axios from "axios";
import HostService from "./HostService";

const host = new HostService().getHost()

export default class DiscountService {
  constructor() {}

  modifier(charisma, reputation_id, success_callback) {
    axios
      .post(
        `${host}/api/discount/`,
        {
          charisma_modifier: charisma,
          reputation_id: reputation_id,
        }
      ).then(res => {
      console.log(res.data);
      success_callback(res.data.discount);
    }).catch(err => console.log(err));
  }

}