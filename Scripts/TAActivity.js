var watchID;
var geo;    // for the geolocation object
var map;    // for the google map object

// position options
var MAXIMUM_AGE = 200; // miliseconds
var TIMEOUT = 300000;
var HIGHACCURACY = true;
var DESIREDACCURACY = 0;
var FREQUENCY = 1;

function getGeoLocation(name, position) {
    try {
        if (!!navigator.geolocation) return navigator.geolocation;
        else return undefined;
    } catch (e) {
        return undefined;
    }
}

function show_map( position, name) {
    
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var latlng = new google.maps.LatLng(latitude, longitude);
    var dateTime = new Date(position.timestamp).toLocaleString();
   // var name = "@Html.Raw(@ViewBag.Name)";
   // alert(name);
    $(function () {
        hub = $.connection.mapHub;
       
        hub.client.placeMarker =  new google.maps.Marker({
                position: latlng,
                title: name
                //  map: map
            });
            var infowindow = new google.maps.InfoWindow({
                content: name + 'Latitude: ' + latitude +
                '<br>Longitude: ' + longitude
            });

            //$('#messages').append('<li>' + name + ' Is @: ' + latitude + ', ' + longitude + ', ' + dateTime + '</li>');
            infowindow.open(map);
            hub.client.placeMarker.setMap(map);
        
       $.connection.hub.start().done(function () {
           $.connection.hub.logging = true;
           hub.server.placeMarker().done(function(name, position){
               startWatching();
              placeMarker.setPosition(latlng);
              
               });
         });
    });

    if (map) {
       map.panTo(latlng);
     //  placeMarker.setPosition(latlng);
    } else {
        var myOptions = {
            zoom: 8,
             center: latlng,
           //  center:   new google.maps.LatLng(36, 3),

            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        map.setTilt(0); // turns off the annoying default 45-deg view

      //  $('#messages').append('<li>' + name + ', at ' + latitude + ', ' + longitude + ', ' + dateTime + '</li>');
    }
   // $('#messages').append('<li>'  + $('#name').val(name) +', at '+ latitude + ', ' + longitude + ', ' + dateTime + '</li>');

}

function geo_error(error) {
    stopWatching();
    switch (error.code) {
        case error.TIMEOUT:
            alert('Geolocation Timeout');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Geolocation Position unavailable');
            break;
        case error.PERMISSION_DENIED:
            alert('Geolocation Permission denied');
            break;
        default:
            alert('Geolocation returned an unknown error code: ' + error.code);
    }
}

function stopWatching() {
    if (watchID) geo.clearWatch(watchID);
    watchID = null;
}
//$clear.on('click', function () {
//    geo.clearWatch(watchID);
//    console.log('watchID: ' + geo.watchID);
//});

    function startWatching() {
        watchID = geo.watchPosition(show_map, geo_error, {
            enableHighAccuracy: HIGHACCURACY,
            maximumAge: MAXIMUM_AGE,
            timeout: TIMEOUT,
            desiredAccuracy: DESIREDACCURACY,
            frequency: FREQUENCY
        });
    }
  //  $watch.on('click', function () {
window.onload = function () {
    if ((geo = getGeoLocation())) {
        startWatching();
    } else {
        alert('Geolocation not supported.')
    }
}
  //  })
//var stopWatchButton = $('#stopWatchButton');
//stopWatchButton.on('click', function (e) {
//    stopWatching();
//});
//var watchPositionButton = $('#watchPositionButton');
//watchPositionButton.on('click', function (e) {
//   startWatching();
//});

//var stopWatchButton = $('#stopWatchButton');
//stopWatchButton.on('click', function (e) {
//    navigator.geolocation.clearPosition(watchID);
//});


//function initializeSignalR() {

//    hub = $.connection.mapHub;
//    //mapMarker = new google.maps.Marker({
//    //    position: latlng,
//    //    title: name
//    //});
//    //mapMarker.setMap(map);

//    hub.client.placeMarker = function (latitude, longitude) {
//      mapMarker = new google.maps.Marker({
//         //   position: latlng
//         // map: map,
//           position: new google.maps.LatLng(latitude, longitude),
//          //  title: name
//        });
//        mapMarker.setMap(map);

//        //var marker = new google.maps.Marker
//        //    ({
//        //        position: new google.maps.LatLng(latitude, longitude),
//        //        map: map
//        //    });
//    }

//    $.connection.hub.start().done(function () {
       
//        startWatching();
       
//        //google.maps.event.addListener(map, 'click', function (event) {
//        //    hub.server.placeMarker(event.latLng.lat(), event.latLng.lng());
//        //})
//    });

//}