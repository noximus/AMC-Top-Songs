'use strict';

/**
 * @ngdoc function
 * @name amcTopSongApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the amcTopSongApp
 */
angular.module('amcTopSongApp')
  .controller('MainCtrl', function ($scope,Spotify) {
    // test spotify call
    // Spotify.getAlbum('0sNOF9WDwhWunNAHPD3Baj').then(function (data) {
    //   // console.log(data);
    //   // $scope.testData = data;
    // });
    // // Search for songs by artist, album, track
    // Spotify.search('Nirvana', 'artist').then(function (data) {
    //   // console.log(data);
    // });
    $scope.searchArtistFunc = function() {
      Spotify.search($scope.searchArtistInput, 'artist').then(function (data) {
        $scope.searchArtistVal = data;
        console.log(data);
        $scope.showArtists = true;  
        $scope.showTracks = false; 
      });
    };
    $scope.selectArtist = function(id) {
      Spotify.getArtistTopTracks(id, 'AU')
      .then(function (data) {
        $scope.selectedArtist = data;
          console.log(data);
        $scope.showArtists = false;  
        $scope.showTracks = true;  
      });
    };
  });
