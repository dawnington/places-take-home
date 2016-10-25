import React from 'react';
import Map from './Map';
import SearchBar from './SearchBar';
import MapStore from '../stores/MapStore';
import { fetchLocation } from '../actions/MapActions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.state = { location: { lat: 0, lng: 0 } };
  }

  componentDidMount() {
    this.listener = MapStore.addListener(this.onLocationChange);
    fetchLocation();
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  onLocationChange() {
    this.setState({ location: MapStore.location() });
  }

  content() {
    if (MapStore.hasLocation()) {
      return <Map location={this.state.location} />;
    }
    return <h3>Searching location...</h3>;
  }

  render() {
    return (
      <div className="content-main">
        <section className="content-left">
          <SearchBar location={this.state.location} />
        </section>
        <section className="content-right">
          {this.content()}
        </section>
      </div>
    );
  }
}

export default App;
