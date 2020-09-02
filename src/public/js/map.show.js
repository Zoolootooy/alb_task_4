var map

function initMap () {
  var position = { lat: 34.101155, lng: -118.343609 }
  var map = new google.maps.Map(document.getElementById('map'), {
    center: position,
    zoom: 18
  })
  var marker = new google.maps.Marker({ position: position, map: map })
}