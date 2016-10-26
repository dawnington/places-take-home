import React from 'react';
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
    const map = document.getElementById('map');
    const mapOptions = {
      center: { lat: this.props.location.lat, lng: this.props.location.lng },
      zoom: 13,
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.geocoder = new google.maps.Geocoder();
    window.service = new google.maps.places.PlacesService(this.map);
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  handleStoreChange() {
    this.setState({ places: PlaceStore.all() });
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
      marker.infowindow.open(this.map, marker);
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
