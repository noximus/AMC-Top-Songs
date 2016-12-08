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
    $scope.playlistObj = {
      title: $scope.playlistTitle,
      songs: $scope.playlist
    }
    $scope.addToPlaylist = function() {
      $scope.playlist.push($scope.inPlaylist);
      console.log($scope.playlistObj);
    }
    $scope.removeFromPlaylist = function(track) {
      $scope.playlist.splice($scope.playlist.indexOf(track),1);
    }
    $scope.searchArtistFunc = function() {
      Spotify.search($scope.searchArtistInput, 'artist').then(function (data) {
        $scope.searchArtistVal = data;
        // console.log(data);
        $scope.showArtists = true; 
        $scope.showAlbums = false; 
        $scope.showTracks = false; 

      });
    };
    $scope.searchAlbumFunc = function(id) {
      Spotify.search($scope.searchAlbumInput, 'album').then(function (data) {
        $scope.searchAlbumVal = data;
        // console.log(data);
        
        $scope.showArtists = false;
        $scope.showAlbums = true;  
        $scope.showTracks = false; 
      });
    };
    $scope.searchSongFunc = function(id) {
      
      Spotify.search($scope.searchSongInput, 'track').then(function (data) {
        $scope.searchTrackVal = data;
        // console.log(data);
        $scope.showArtists = false;
        $scope.showAlbums = false;  
        $scope.showTracks = true; 
      });
    };
    $scope.clearAll = function(id) {
        $scope.searchArtistInput = null;
        $scope.searchAlbumInput = null;
        $scope.searchSongInput = null;
        // console.log("clear all");
        $scope.showArtists = false;
        $scope.showAlbums = false;  
        $scope.showTracks = false; 

    };
    $scope.selectArtist = function(id) {
      Spotify.getArtistTopTracks(id, 'US')
      .then(function (data) {
        $scope.selectedArtist = data;
          // console.log(data);
        $scope.showArtists = true;
        $scope.showAlbums = false;  
        $scope.showTracks = true;  
      });
    };
    $scope.selectAlbum = function(id) {
      Spotify.getAlbum(id)
      .then(function (data) {
        $scope.selectedAlbumVal = data;
          // console.log("this one");
        $scope.showArtists = false;  
        $scope.showAlbums = true;  
        $scope.showTracks = true;  
      });
    };
    
    
    $scope.AddTracktoPlaylist = function(id) {
      Spotify.getTrack(id).then(function (data) {
        $scope.selectedTrack = data;
        // create array to input
        $scope.inPlaylist = {
          track: $scope.selectedTrack.name,
          artist: $scope.selectedTrack.artists[0].name,
          album: $scope.selectedTrack.album.name,
          note: 'Love this song! Listened to it all of the time on my RV trip!',
          customImage: 'https://www.stitch.net/wp-content/uploads/2014/10/9.jpg' ,
          id: $scope.selectedTrack.id
        }
        // Add the item to the song array
        $scope.addToPlaylist();

      });
    };
  });









