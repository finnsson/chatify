var sp = getSpotifyApi(1);
var models = sp.require('sp://import/scripts/api/models');
var views = sp.require('sp://import/scripts/api/views');
var player = models.player;

exports.init = init;
//var currentTrackPlayer = null;

window.socket = null;

function init() {

    // TODO: update the IP as well as the manifest-file using $ ifconfig en1 | grep inet | cut -d " " -f2
    var socket = io.connect('http://10.0.1.4:8090');
    window.socket = socket;

    socket.on('newText', function(data) {
        console.error("message received");
        $('#texts').append('<li>' + data.username + ': ' + data.text + '</li>');
    });

    $('#text_to_say').keypress(function(event) {
        if (event.which == 13) {
            console.error("enter pressed");
            say();
        }
    });

    var say = function() {
        var textToSayElement = $('#text_to_say');
        var username = $('#username').val();
        var textToSay = textToSayElement.val();
        textToSayElement.val('');
        socket.emit('textToSay', {text: textToSay, username: username});
        console.error("message emitted");
    };
    console.error("end of init");

    /*
     var somePlayer = new views.Player();
     var area = document.getElementById("area");
     area.appendChild(somePlayer.node);


     updatePageWithTrackDetails();

     player.observe(models.EVENT.CHANGE, function (e) {

     // Only update the page if the track changed
     if (e.data.curtrack == true) {
     updatePageWithTrackDetails();
     }
     });

     var a = models.Album.fromURI("spotify:album:5zyS3GEyL1FmDWgVXxUvj7", function(album) {
     somePlayer.context = a;
     console.log("Album loaded", album.name);
     });
     */
}

function updatePageWithTrackDetails() {

    //var currentTrackElement = document.getElementById("current_track");

    // This will be null if nothing is playing.
    var playerTrackInfo = player.track;

    console.log("updatePageWithTrackDetails");
    if (playerTrackInfo == null) {
        console.log("playerTrackInfo == null");
        //header.innerText = "Nothing playing!";
    } else {
        var track = playerTrackInfo.data;
        console.error(track);
        //var trackView = new views.Track(track, views.Track.FIELD);
        //var currentTrackElement = document.getElementById("current_track");
        //currentTrackElement.appendChild(trackView.node);

        //currentTrackPlayer.play(track);
        //header.innerHTML = track.name + " on the album " + track.album.name + " by " + track.album.artist.name + ".";
    }
}