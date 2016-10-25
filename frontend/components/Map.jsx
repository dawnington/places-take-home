import React from 'react';
import ReactDOM from 'react-dom';
// import MapStore from '../stores/MapStore';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { places: {} };
  }

  componentDidMount() {
    this.markers = [];
    const map = document.getElementById('map');
    const mapOptions = {
      center: { lat: this.props.location.lat, lng: this.props.location.lng },
      zoom: 15,
    };
    this.map = new google.maps.Map(map, mapOptions);
    this.geocoder = new google.maps.Geocoder();
  }

  callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        console.log(results[i]);
      }
    }
  }

  createMarker(id) {
    let self = this;
    const result = this.state.venues[id];
    const marker = new google.maps.Marker({
      position: { lat: result.lat, lng: result.lng },
      map: this.map
    });

    // marker.addListener('click', function () {
    //   if (self.currMarker) {
    //     self.currMarker.infowindow.close();
    //   }
    //   marker.infowindow.open(this.map, marker);
    //   self.currMarker = marker;
    //   self.handleMarkerClick(id);
    // });

    this.markers.push(marker);
  }

  render() {
    return (
      <div id="map"></div>
    );
  }

}

export default Map;
