import $ from 'jquery';

export class AsteroidApi {

  getRoids(startD, endD) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest()
      let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startD}&end_date=${endD}&api_key=xTCFCcr8WZts1nzv144pnN4yxxukx4GGDRoOhesX`
      request.onload = function() {
        if (this.status == 200) {
          resolve(request.response)

        } else {
          reject(Error(request.statusText))
        }
      }
      request.open("GET", url, true)
      request.send()
    })
  }

  parseResponce(response) {
    let count = 0;
    let asteroid = JSON.parse(response)
    // console.log(asteroid.near_earth_objects);  SAVE   THIS IS USEFUL TO LEAN HAOW TO PARSE THE API DATA
    for (let i = 0; i < Object.keys(asteroid.near_earth_objects).length; i++) {
      let thisAsteroid = Object.keys(asteroid.near_earth_objects)[i];
      for (let j = 0; j < asteroid.near_earth_objects[thisAsteroid].length; j++) {
        let threat = asteroid.near_earth_objects[thisAsteroid][j].is_potentially_hazardous_asteroid
        if (threat == true) {
          count += 1
          let distance = asteroid.near_earth_objects[thisAsteroid][j].close_approach_data[0].miss_distance.miles;
          let velocity = asteroid.near_earth_objects[thisAsteroid][j].close_approach_data[0].relative_velocity.miles_per_hour;
          let velocityF = Math.floor(velocity)
          let timeUntilImpact = Math.floor((distance / velocity) / 24);
          $("#results").append(
            "<div class='w3-container w3-row'>" +
            "<div class='w3-quarter'> " + `${asteroid.near_earth_objects[thisAsteroid][j].name}` + "</div>" +
            "<div class='w3-quarter'> " + `${asteroid.near_earth_objects[thisAsteroid][j].close_approach_data[0].miss_distance.miles}` + "miles </div>" +
            "<div class='w3-quarter'> " + `${velocityF}` + "mph </div>" +
            "<div class='w3-quarter'> " + timeUntilImpact + " days </div>" +
            "</div>" + "<br>");
        }
      }
    }
    if (count == 0) {
      $("#results").text("There are no potentially hazardous asteroids approaching in that date range. Guess you'll have to go to work")
    }
  }

}
