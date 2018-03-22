import $ from 'jquery';

export class AsteroidApi{

  getRoids(startD, endD){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest()
      let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startD}&end_date=${endD}&api_key=xTCFCcr8WZts1nzv144pnN4yxxukx4GGDRoOhesX`
      request.onload = function(){
        if (this.status == 200){
          resolve(request.response)

        } else {
          reject(Error(request.statusText))
        }
      }
      request.open("GET", url, true)
      request.send()
    })
  }
}
