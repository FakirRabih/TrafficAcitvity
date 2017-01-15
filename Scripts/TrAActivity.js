var map,
      marker, // marker showing user's current location
      coords = new google.maps.LatLng(36, 3);  // default coords
// position options
var MAXIMUM_AGE = 200; // miliseconds
var TIMEOUT = 300000;
var HIGHACCURACY = true;
var DESIREDACCURACY = 0;
var FREQUENCY = 1;

function setMarker(pos, name) {
    var lat = pos.coords.latitude,
        lng = pos.coords.longitude;
        speed = pos.coords.speed;
        dateTime = new Date(pos.timestamp).toLocaleString();
        coords = new google.maps.LatLng(lat, lng);
        Title = name;
    marker = new google.maps.Marker({
        map: map,
        position: coords,
        title: Title
    });
    map.panTo(coords);
    //$("#messages").append('<li>' + lat + ', ' + lng + ', ' + ', ' + speed + ', ' + dateTime + '</li>');

}

//(function () { 
hub = $.connection.mapHub;
$clientCount = $("#clientCount");
//$messages = $("#messages");
//$messages = $("#messages").append('<li>' + name + ' Is @: ' + '</li>');
//$messages = $('#messages').append('<li><strong>' + htmlEncode(name) + '</li>');

// This optional function html-encodes messages for display in the page.


$.extend(hub.client,
    {
        placeMarker: function (name, position) {
            setMarker(name, position);           
        }
    },
    {
        placeMarker: function (name, position) {
            
           // $('#message').append('<li>' + name  + '</li>');
            $('#message').append('<li>' + name + ' Is @: ' + latitude + ', ' + longitude + '</li>');
          //  $('#message').append('<li>' + name + ' Is @: ' + htmlEncode(latitude) + ', ' + htmlEncode(longitude) + '</li>');
          
             //$messages.text(name);

        }
    },
 
     {
         clientCountChanged: function (count) {
             $clientCount.text(count);
     }
     });

$.connection.hub.start().done(function () {   
    init();
    hub.server.placeMarker(
                        $('#displayname').val()
                       // $('#messages').val(),
                     // $('#latitude').val(), $('#longitude').val(), $('#time').val(), $('#speed').val()

                    );
});
//}());
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}

// initialize map with user's current position and watch if position changes
function init() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: coords,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });
    //("#messages").append('<li>' + $('#displayname').val() + ' Is @: ' + lat + ', ' + lng + ', ' + dateTime  + '</li>');
  
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(setMarker, geo_error, options);

    } else {
        alert("Your browser does not support the Geolocation API");
    }
    var x = document.getElementById("ErrMessage");
    function geo_error(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }

    var options = {
        enableHighAccuracy: HIGHACCURACY,
        maximumAge: MAXIMUM_AGE,
        timeout: TIMEOUT,
        desiredAccuracy: DESIREDACCURACY,
        frequency: FREQUENCY
    };
    navigator.geolocation.watchPosition(function (pos) {
        var lat = pos.coords.latitude,
            lng = pos.coords.longitude;
        dateTime = new Date(pos.timestamp).toLocaleString();
        speed = pos.coords.speed;
        coords = new google.maps.LatLng(lat, lng);
        marker.setPosition(coords);
        map.panTo(coords);
      //  $("#messages").append('<li>' + lat + ', ' + lng + ', ' + dateTime + ', ' + speed + '</li>');

    }, geo_error, options);
}
