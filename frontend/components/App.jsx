import React from 'react';
import Map from './Map';
import SearchBar from './SearchBar';
import PlaceIndex from './PlaceIndex';
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

  render() {
    return (
      <div className="content-main">
        <section className="content-left">
          <SearchBar location={this.state.location} />
          <PlaceIndex />
        </section>
        {this.props.children}
        <section className="content-right">
          <Map location={this.state.location} />
        </section>
      </div>
    );
  }
}

export default App;
