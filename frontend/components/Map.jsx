/* global google */
/* eslint-env browser */

import React from 'react';
import hashHistory from 'react-router/lib/hashHistory';
import PlaceStore from '../stores/PlaceStore';
import { updateLocation } from '../actions/MapActions';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlacesChange = this.handlePlacesChange.bind(this);
    this.state = { places: [] };
  }

  componentDidMount() {
    this.placeListener = PlaceStore.addListener(this.handlePlacesChange);
    this.markers = [];
    this.createMap();
  }

  componentWillUnmount() {
    this.placeListener.remove();
  }

  handlePlacesChange() {
    this.setState({ places: PlaceStore.all() }, this.resetMarkers);
  }

  createMap() {
    const mapEl = document.getElementById('map');
    const location = { lat: 37.786567, lng: -122.405303 };
    const mapOptions = {
      center: { lat: location.lat, lng: location.lng },
      zoom: 13,
    };
    window.map = new google.maps.Map(mapEl, mapOptions);
    this.geocoder = new google.maps.Geocoder();

    window.map.addListener('idle', () => {
      updateLocation();
    });

    window.service = new google.maps.places.PlacesService(window.map);
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
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    const marker = new google.maps.Marker({
      position: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
      label: labels[labelIdx % labels.length],
      map: window.map,
    });

    marker.infowindow = new google.maps.InfoWindow({
      content: `<h4>${place.name}</h4>`,
    });

    marker.addListener('click', () => {
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
