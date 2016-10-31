/* global google */
/* eslint-env browser */

import React from 'react';
import hashHistory from 'react-router/lib/hashHistory';
import PlaceStore from '../stores/PlaceStore';
import MapStore from '../stores/MapStore';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlacesChange = this.handlePlacesChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.state = { places: [], location: { lat: 37.786567, lng: -122.405303 } };
  }

  componentDidMount() {
    this.placeListener = PlaceStore.addListener(this.handlePlacesChange);
    this.mapListener = MapStore.addListener(this.handleLocationChange);
    this.markers = [];
    this.createMap();
  }

  componentDidUpdate() {
    this.resetMarkers();
  }

  componentWillUnmount() {
    this.placeListener.remove();
    this.mapListener.remove();
  }

  handlePlacesChange() {
    this.setState({ places: PlaceStore.all() });
  }

  handleLocationChange() {
    this.setState({ location: MapStore.location() }, () => {
      this.createMap();
      this.addLocationWindow();
    });
  }

  createMap() {
    const mapEl = document.getElementById('map');
    const location = this.state.location;
    const mapOptions = {
      center: { lat: location.lat, lng: location.lng },
      zoom: 13,
    };
    var map = new google.maps.Map(mapEl, mapOptions);
    this.map = map;
    this.geocoder = new google.maps.Geocoder();

    window.service = new google.maps.places.PlacesService(map);
  }

  addLocationWindow() {
    const location = this.state.location;
    const pos = {
      lat: location.lat,
      lng: location.lng,
    };

    const infoWindow = new google.maps.InfoWindow({ map: this.map });
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
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
      hashHistory.push(`results/${place.id}`);
    });

    this.markers.push(marker);
  }

  render() {
    return (
      <div id="map" />
    );
  }

}

export default Map;
