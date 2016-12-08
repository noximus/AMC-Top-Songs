angular.module('amcTopSongApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/main.html',
    "<div class=\"row\"> <!-- Search by Artist, Album, Track --> <h4>Search Song by</h4> <div class=\"col-sm-4\"> <input type=\"text\" name=\"searchArtist\" placeholder=\"Search Artist\" maxlength=\"40\" class=\"search form-control\" ng-model=\"searchArtistInput\" ng-focus=\"clearAll()\"> <button type=\"submit\" class=\"btn btn-default\" ng-click=\"searchArtistFunc()\">Search</button> </div> <div class=\"col-sm-4\"> <input type=\"text\" name=\"searchAlbum\" placeholder=\"Search Album\" maxlength=\"40\" class=\"search form-control\" ng-model=\"searchAlbumInput\" ng-focus=\"clearAll()\"> <button type=\"submit\" class=\"btn btn-default\" ng-click=\"searchAlbumFunc()\">Search</button> </div> <div class=\"col-sm-4\"> <input type=\"text\" name=\"searchSong\" placeholder=\"Search Song\" maxlength=\"40\" class=\"search form-control\" ng-model=\"searchSongInput\" ng-focus=\"clearAll()\"> <button type=\"submit\" class=\"btn btn-default\" ng-click=\"searchSongFunc()\">Search</button> </div> <!-- Search Results Artist --> <div class=\"col-sm-6 scroller\" ng-show=\"showArtists\"> <div class=\"selectItem\" ng-repeat=\"Artists in searchArtistVal.artists.items\" ng-click=\"selectArtist(Artists.id)\"> <div class=\"col-sm-10\">{{Artists.name}}</div> </div> </div> <!-- Search Results Album --> <div class=\"col-sm-6 scroller\" ng-show=\"showAlbums\"> <div class=\"selectItem\" ng-repeat=\"Albums in searchAlbumVal.albums.items\" ng-click=\"selectAlbum(Albums.id)\"> <div class=\"col-sm-10\">{{Albums.name}}</div> </div> </div> <!-- Search Results Track --> <div class=\"col-sm-6 scroller\" ng-show=\"showTracks\"> <div ng-repeat=\"Track in selectedArtist.tracks\"> <div class=\"col-sm-8\">{{Track.name}}</div> <div class=\"col-sm-4\"> <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"AddTracktoPlaylist(Track.id)\">Add Track to playlist</button> </div> </div> <div ng-repeat=\"Track in searchTrackVal.tracks.items\"> <div class=\"col-sm-8\">{{Track.name}}</div> <div class=\"col-sm-4\"> <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"AddTracktoPlaylist(Track.id)\">Add Track to playlist</button> </div> </div> <div ng-repeat=\"Track in selectedAlbumVal.tracks.items\"> <div class=\"col-sm-8\">{{Track.name}}</div> <div class=\"col-sm-4\"> <button type=\"button\" class=\"btn btn-success btn-sm\" ng-click=\"AddTracktoPlaylist(Track.id)\">Add Track to playlist</button> </div> </div> </div> <!-- Play list  --> <h4>{{playlistTitle}}</h4> <div class=\"row\"> <div ng-repeat=\"Tracks in playlist\"><div class=\"col-sm-12\"> <div class=\"col-sm-2\">{{Tracks.track}}</div> <div class=\"col-sm-2\">{{Tracks.artist}}</div> <div class=\"col-sm-2\">{{Tracks.album}}</div> <div class=\"col-sm-4\">{{Tracks.note}}</div> <div class=\"col-sm-2\"><button type=\"button\" class=\"btn btn-danger\" ng-click=\"removeFromPlaylist(Tracks)\">Remove</button></div> </div> </div> <h4>Exported JSON Format</h4> {{playlistObj}} <!-- </div> --> </div></div>"
  );

}]);