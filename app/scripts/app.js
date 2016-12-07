'use strict';

/**
 * @ngdoc overview
 * @name amcTopSongApp
 * @description
 * # amcTopSongApp
 *
 * Main module of the application.
 */
angular
  .module('amcTopSongApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'spotify'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
