import { AsteroidApi } from "./js/api.js"
import { solar } from "./js/solarsystem.js"
import { exampleStuff } from "./example.js"
import * as THREE from 'three';
import $ from 'jquery';
import './styles.css';
import 'three-examples/controls/OrbitControls';


$(document).ready(function() {
  solar()
  $("#roid-butt").click(function(){
  let startD = $("#start_date").val()
  let endD = $("#end_date").val()
  $("#start_date").val("");
  $("#end_date").val("");

  let newAsteroid = new AsteroidApi;
  let promise = newAsteroid.getRoids(startD, endD);
  promise.then(function(response) {
    let asteroid = JSON.parse(response)
    console.log(asteroid.near_earth_objects);
      for(let i = 0; i < Object.keys(asteroid.near_earth_objects).length; i++){
      let thisAsteroid = Object.keys(asteroid.near_earth_objects)[i];
      // console.log(thisAsteroid);
        for(let j = 0; j < asteroid.near_earth_objects[thisAsteroid].length; j++){
        let threat = asteroid.near_earth_objects[thisAsteroid][j].is_potentially_hazardous_asteroid
        if (threat == true){
          let distance = asteroid.near_earth_objects[thisAsteroid][j].close_approach_data[0].miss_distance.miles;
          let velocity = asteroid.near_earth_objects[thisAsteroid][j].close_approach_data[0].relative_velocity.miles_per_hour;
          let velocityF = Math.floor(velocity)
          let timeUntilImpact = Math.floor((distance/velocity)/24);
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
}, function(error){
  $("#results").text(`There was an error with your request : ${error.message}`)
})
})
})
