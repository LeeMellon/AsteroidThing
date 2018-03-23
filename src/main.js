import { AsteroidApi } from "./js/api.js"
import { solar } from "./js/solarsystem.js"
import * as THREE from 'three';
import $ from 'jquery';
import './styles.css';
import 'three-examples/controls/OrbitControls';


$(document).ready(function() {
  solar()
  $("#roid-butt").click(function() {
    let startD = $("#start_date").val()
    let endD = $("#end_date").val()
    $("#start_date").val("");
    $("#end_date").val("");
    $("#results").html("");

    let newAsteroid = new AsteroidApi;
    let promise = newAsteroid.getRoids(startD, endD);
    promise.then(function(response) {
      newAsteroid.parseResponce(response)
    }, function(error) {
      $("#results").text(`There was an error with your request : ${error.message}`)
    })
  })
})
