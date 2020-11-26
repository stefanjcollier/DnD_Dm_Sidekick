export default class HostService {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.host = 'https://dm-sidekick-api.herokuapp.com'
    } else {
      this.host = 'http://localhost:8000'
    }
  }

  getHost(){
    return this.host
  }
}