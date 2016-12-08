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
    $scope.playlistTitle = 'My Top 10 Songs';
    $scope.playlist = [];
    $scope.addToPlaylist = function() {
      $scope.playlist.push($scope.inPlaylist);
      console.log($scope.playlist);
    }
    $scope.removeFromPlaylist = function(track) {
      $scope.playlist.splice($scope.playlist.indexOf(track),1);
    }
    $scope.searchArtistFunc = function() {
      Spotify.search($scope.searchArtistInput, 'artist').then(function (data) {
        $scope.searchArtistVal = data;
        // console.log(data);
        $scope.showArtists = true;  
        $scope.showTracks = true; 
      });
    };
    $scope.selectArtist = function(id) {
      Spotify.getArtistTopTracks(id, 'US')
      .then(function (data) {
        $scope.selectedArtist = data;
          // console.log(data);
        $scope.showArtists = true;  
        $scope.showTracks = true;  
      });
    };
    $scope.AddTracktoPlaylist = function(id) {
      Spotify.getTrack(id).then(function (data) {
        $scope.selectedTrack = data;
        $scope.inPlaylist = {
          track: $scope.selectedTrack.name,
          artist: $scope.selectedTrack.artists[0].name,
          album: $scope.selectedTrack.album.name,
          note: 'Love this song! Listened to it all of the time on my RV trip!',
          customImage: 'https://www.stitch.net/wp-content/uploads/2014/10/9.jpg' ,
          id: $scope.selectedTrack.id
        }
        $scope.addToPlaylist();
          // console.log($scope.inPlaylist);
        $scope.showArtists = true;  
        $scope.showTracks = true; 
      });
    };
  });









