import React from 'react';
import hashHistory from 'react-router/lib/hashHistory';
import PlaceStore from '../stores/PlaceStore';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.state = { places: [] };
  }

  componentDidMount() {
    this.listener = PlaceStore.addListener(this.handleStoreChange);
    this.markers = [];
    this.createMap();
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  handleStoreChange() {
    this.setState({ places: PlaceStore.all() });
  }

  createMap() {
    const mapEl = document.getElementById('map');
    const mapOptions = {
      center: { lat: 37.786567, lng: -122.405303 },
      zoom: 13,
    };
    var map = new google.maps.Map(mapEl, mapOptions);
    this.map = map;
    this.geocoder = new google.maps.Geocoder();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        const infoWindow = new google.maps.InfoWindow({map: map});
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }

    window.service = new google.maps.places.PlacesService(map);
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }

  resetMarkers() {
    this.clearMarkers();
    let labelIndex = 0;
    const places = this.state.places;
    for (let place of places) {
      this.createMarker(place, labelIndex++);
    }
  }

  clearMarkers() {
    this.markers = this.markers || [];
    this.markers.forEach(marker =>
      marker.setMap(null)
    );
    this.markers = [];
  }

  createMarker(place, labelIdx) {
    const self = this;
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const marker = new google.maps.Marker({
      position: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
      label: labels[labelIdx % labels.length],
      map: this.map,
    });

    marker.infowindow = new google.maps.InfoWindow({
      content: `<h4>${place.name}</h4>`,
    });

    marker.addListener('click', function () {
      if (self.currMarker) {
        self.currMarker.infowindow.close();
      }
      hashHistory.push(`results/${place.id}`);
      marker.infowindow.open(map, marker);
      self.currMarker = marker;
    });

    this.markers.push(marker);
  }

  render() {
    this.resetMarkers();
    return (
      <div id="map" />
    );
  }

}

export default Map;
