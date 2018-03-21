import { AsteroidApi } from "./js/api.js"
// import {} from "./js/solarsytem.js"
import $ from 'jquery';
import './styles.css';

$(document).ready(function() {
  $("#roid-butt").click(function(){
  let startD = $("#start_date").val()
  let endD = $("#end_date").val()
  $("#start_date").val("");
  $("#end_date").val("");

  let newAsteroid = new AsteroidApi;
  let promise = newAsteroid.getRoids(startD, endD);
  promise.then(function(response) {
    let asteroid = JSON.parse(response)
    console.log(asteroid);
    console.log(typeof asteroid.near_earth_objects);

    console.log(Object.keys(asteroid.near_earth_objects).length);
    console.log(asteroid.near_earth_objects.[0][0].name);
    for(let i = 0; i < Object.keys(asteroid.near_earth_objects).length; i++){
      for(let j = 0; j < Object.keys(asteroid.near_earth_objects[i]).length; j++){
        $('#roids').text("<li>" + `name:  ${asteroid.near_earth_objects[i][j].name}` + "</li>")
      }
    }


  // })
});
})
})
