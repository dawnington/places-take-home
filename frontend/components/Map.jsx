import React from 'react';
import ReactDOM from 'react-dom';
import MapStore from '../stores/MapStore';

const Map = React.createClass({
  getInitialState() {
    return { venues: {} };
  },

  componentDidMount() {
    this.markers = [];
    const map = ReactDOM.findDOMNode(this.refs.map);
    const mapOptions = {
      center: { lat: this.props.location.lat, lng: this.props.location.lng },
      zoom: 15,
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.geocoder = new google.maps.Geocoder();
    this.listener = MapStore.addListener(this.handleVenueChange);
  },

  componentWillUnmount() {
    this.listener.remove();
  },

  handleVenueChange() {
    this.setState({ venues: MapStore.venues() });
  },

  resetMarkers() {
    const venues = this.state.venues;
    for (let venueId in venues) {
      this.setSingleMarker(venueId);
    }
  },

  setSingleMarker(id) {
    let self = this;
    const result = this.state.venues[id];
    const marker = new google.maps.Marker({
      position: { lat: result.lat, lng: result.lng },
      map: this.map
    });

    marker.infowindow = new google.maps.InfoWindow({
      content: `<h4>${result.name}</h4>`
    });

    marker.addListener('click', function () {
      if (self.currMarker) {
        self.currMarker.infowindow.close();
      }
      marker.infowindow.open(this.map, marker);
      self.currMarker = marker;
      self.handleMarkerClick(id);
    });

    this.markers.push(marker);
  },

  handleMarkerClick(id) {
    hashHistory.push(`venues/${id}`);
  },

  render() {
    this.resetMarkers();
    return <div className="map" ref="map"></div>;
  },
});

export default Map;
