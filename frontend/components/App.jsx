import React from 'react';
import Map from './Map';
import MapStore from '../stores/MapStore';
import { fetchLocation } from '../actions/MapActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: { lat: 0, lng: 0 } };
  }

  componentDidMount() {
    this.listener = MapStore.addListener(this.handleLocationChange);
    fetchLocation();
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  handleLocationChange() {
    this.setState({ location: MapStore.location() });
  }

  content() {
    if (MapStore.hasLocation()) {
      return <Map location={this.state.location} />;
    }
    return 'Searching Location....';
  }

  render() {
    return (
      <div className="main">
        <h1>Places</h1>
        {this.content()}
      </div>
    )
  }
}

export default App;
