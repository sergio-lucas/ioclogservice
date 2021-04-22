class LogService {
  constructor() {
      this.meta = {};
      this.server = LogService.BASE_URL;
      this.logChain = Promise.resolve();
  }

  init({ respondentId, surveyCode }) {
      if(!respondentId){
          return; //preview mode
      }
      this.meta.uid = respondentId.toString();
      this.meta.survey = surveyCode;
  }



  log(msg) {
      if(!this.meta.uid) return; //preview mode

      const info = msg && msg.message && msg || { message: msg };
      info.time = Date.now();

      console.log(info)
      this.logChain = this.logChain.then(this.sendLogs(info))
  }

  sendLogs(logMessage) {
    return fetch(this.server, {
      method: "POST",
      headers: {
       'Accept': 'application/json, text/plain',
       'Content-Type': 'application/json;charset=UTF-8'
     },
      body: JSON.stringify({
        ...this.meta,
        data: JSON.stringify(logMessage)
      })
    })
  }

}

export default (ioc, url) => {
  LogService.BASE_URL = url;
  ioc.service('logService', LogService)
}