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
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name amcTopSongApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the amcTopSongApp
 */
angular.module('amcTopSongApp')
  .controller('MainCtrl', ["$scope", "Spotify", function ($scope,Spotify) {
    $scope.playlistTitle = 'My Top 10 Songs';
    $scope.playlist = [];
    $scope.playlistObj = {
      title: $scope.playlistTitle,
      songs: $scope.playlist
    }
    $scope.playlistObjFormatted = JSON.stringify($scope.playlistObj, null , "    ");

    $scope.addToPlaylist = function() {
      $scope.playlist.push($scope.inPlaylist);
      // console.log($scope.playlistObj);
      $scope.playlistObjFormatted = JSON.stringify($scope.playlistObj, null , "    ");
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
    new Clipboard('.addToClipboard');
  }]);










angular.module('amcTopSongApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"row\"> <!-- Search by Artist, Album, Track --> <div class=\"spacer\"> <h4>Search Song by</h4> <div class=\"col-sm-4\"> <div class=\"row\"> <div class=\"col-sm-8\"> <input type=\"text\" name=\"searchArtist\" placeholder=\"Search Artist\" maxlength=\"40\" class=\"search form-control\" ng-model=\"searchArtistInput\" ng-focus=\"clearAll()\" ng-keyup=\"$event.keyCode == 13 && searchArtistFunc()\"> </div> <div class=\"col-sm-4\"><button type=\"submit\" class=\"btn btn-default\" ng-click=\"searchArtistFunc()\">Search</button></div> </div> </div> <div class=\"col-sm-4\"> <div class=\"row\"> <div class=\"col-sm-8\"><input type=\"text\" name=\"searchAlbum\" placeholder=\"Search Album\" maxlength=\"40\" class=\"search form-control\" ng-model=\"searchAlbumInput\" ng-focus=\"clearAll()\" ng-keyup=\"$event.keyCode == 13 && searchAlbumFunc()\"></div> <div class=\"col-sm-4\"><button type=\"submit\" class=\"btn btn-default\" ng-click=\"searchAlbumFunc()\">Search</button></div> </div> </div> <div class=\"col-sm-4\"> <div class=\"row\"> <div class=\"col-sm-8\"><input type=\"text\" name=\"searchSong\" placeholder=\"Search Song\" maxlength=\"40\" class=\"search form-control\" ng-model=\"searchSongInput\" ng-focus=\"clearAll()\" ng-keyup=\"$event.keyCode == 13 && searchSongFunc()\"></div> <div class=\"col-sm-4\"><button type=\"submit\" class=\"btn btn-default\" ng-click=\"searchSongFunc()\">Search</button></div> </div> </div> </div> <!-- Search Results Artist --> <div class=\"col-sm-6 scroller\" ng-show=\"showArtists\"> <h5>Artists</h5> <div class=\"selectItem\" ng-repeat=\"Artists in searchArtistVal.artists.items\" ng-click=\"selectArtist(Artists.id)\"> <div class=\"col-sm-10\">{{Artists.name}}</div> </div> </div> <!-- Search Results Album --> <div class=\"col-sm-6 scroller\" ng-show=\"showAlbums\"> <h5>Albums</h5> <div class=\"selectItem\" ng-repeat=\"Albums in searchAlbumVal.albums.items\" ng-click=\"selectAlbum(Albums.id)\"> <div class=\"col-sm-10\">{{Albums.name}}</div> </div> </div> <!-- Search Results Track --> <div class=\"col-sm-6 scroller\" ng-show=\"showTracks\"> <h5>Tracks</h5> <div ng-repeat=\"Track in selectedArtist.tracks\"> <div class=\"col-sm-8\">{{Track.name}}</div> <div class=\"col-sm-4\"> <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"AddTracktoPlaylist(Track.id)\">Add Track to playlist</button> </div> </div> <div ng-repeat=\"Track in searchTrackVal.tracks.items\"> <div class=\"col-sm-8\">{{Track.name}}</div> <div class=\"col-sm-4\"> <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"AddTracktoPlaylist(Track.id)\">Add Track to playlist</button> </div> </div> <div ng-repeat=\"Track in selectedAlbumVal.tracks.items\"> <div class=\"col-sm-8\">{{Track.name}}</div> <div class=\"col-sm-4\"> <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"AddTracktoPlaylist(Track.id)\">Add Track to playlist</button> </div> </div> </div> <!-- Play list  --> <div class=\"row\"> <div class=\"col-sm-12\"> <h4>{{playlistTitle}}</h4> <div ng-repeat=\"Tracks in playlist\"> <div class=\"row\"> <div class=\"col-sm-2\">{{Tracks.track}}</div> <div class=\"col-sm-2\">{{Tracks.artist}}</div> <div class=\"col-sm-2\">{{Tracks.album}}</div> <div class=\"col-sm-4\">{{Tracks.note}}</div> <div class=\"col-sm-2\"><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeFromPlaylist(Tracks)\">Remove</button></div> </div> </div> </div> </div> <h4>Exported JSON Format</h4> <pre>{{playlistObjFormatted}}</pre> <!-- </div> --> </div>"
  );

}]);
