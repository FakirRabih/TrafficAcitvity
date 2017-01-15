//<script type="text/javascript">
var watchID;
var geoLoc;
var name;

function showLocation( position) {
    var locationMarker = null;
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
       //hub = $.connection.mapHub;

        //hub.client.placeMarker = function ( position, name) {
        //    var marker = new google.maps.Marker
        //        ({

        //            position: new google.maps.LatLng(name, position),
        //            map: map,
        //            title: name
        //        });
        //   // hub.markers[name] = marker;
        //}

        //$.connection.hub.start().done(function () {
        //    google.maps.event.addListener(map, 'click', function (event, name) {
        //       // hub.server.placeMarker(name, event.latLng.lat(), event.latLng.lng());
        //       hub.server.placeMarker(name, event.latLng, map);
                
        //    })
            
        //});
    
    //---------------
    var mapOptions =
        {
            center: new google.maps.LatLng(32, 7),
            zoom: 5
        };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
   initializeSignalR();
    //-----------------
    //////$(function () {
    //////    hub = $.connection.mapHub;

    //////    hub.client.placeMarker = function (position, name) {
    //////        var marker = new google.maps.Marker
    //////            ({
    //////                position: new google.maps.LatLng(position),
    //////                map: map
                   
    //////            });
    //////    }

    //////    $.connection.hub.start().done(function () {
    //////       // google.maps.event.addListener(map, 'click', function ( event) {
    //////            hub.server.placeMarker(event.latLng.lat(), event.latLng.lng());
    //////        //})
    //////    });
    //////});


    //  
   // hub.server.placeMarker(name, position);
  // alert( "Latitude : " + latitude + " Longitude: " + longitude);
    $('#messages').append('<li>' + name + ', at ' + latitude + ', ' + longitude + '</li>');
    
  
}
         
function errorHandler(err) {
    if(err.code == 1) {
        alert("Error: Access is denied!");
    }
            
    else if( err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}


//    $.connection.hub.start().done(function () {
//        google.maps.event.addListener(map, function (event) {
            
//          //  hub.server.placeMarker(event.latLng.lat(), event.latLng.lng());
            
//            this.placeMarker(event.latLng, map);
//            //  google.maps.event.removeListener(boundsListener);
//        })

//    });

//}
         
function getLocationUpdate(){
    if(navigator.geolocation){
        // timeout at 60000 milliseconds (60 seconds)
        var options = {timeout:60000};
        geoLoc = navigator.geolocation;
        watchID = geoLoc.watchPosition( showLocation, errorHandler, options);
    }
            
    else{
        alert("Sorry, browser does not support geolocation!");
    }
}
function SetMarker(position) {
    if (map != null) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(position),
            map: map,
            animation: google.maps.Animation.DROP
        });
    }
}
function initializeSignalR() {

    hub = $.connection.mapHub;

    hub.client.placeMarker = function (position) {
        var dynamicLocationObject = jQuery.parseJSON(position);
        var latAndLonObject = new google.maps.LatLng(dynamicLocationObject.lat, dynamicLocationObject.lng);
        SetMarker(latAndLonObject);
        //var marker = new google.maps.Marker
        //    ({
        //        position: new google.maps.LatLng(position),
        //        map: map
        //        //icon: {
        //        //    url: 'Content/images/red-circle.png',
        //        //    size: new google.maps.Size(70, 86), //marker image size
        //        //    origin: new google.maps.Point(0, 0), // marker origin
        //        //    anchor: new google.maps.Point(35, 86) // X-axis value (35, half of marker width) and 86 is Y-axis value (height of the marker).
        //        //}
        //    });

    }
    $.connection.hub.start().done(function (position) {
        showLocation();
       
         //  google.maps.event.addListener(map, 'click', function (event) {
            
         //      hub.server.placeMarker(event.latLng.lat(), event.latLng.lng());
         //SetMarker(event.latLng.lat(), event.latLng.lng(), map);
             
         ////       //  google.maps.event.removeListener(boundsListener);
         // })

        });

    }

//</script>