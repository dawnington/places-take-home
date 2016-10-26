import React from 'react';
import hashHistory from 'react-router/lib/hashHistory';
import { addResults } from '../actions/ResultActions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.state = { query: '' };
  }

  componentDidMount() {
    const input = document.getElementById('searchBar');

    const lat = this.props.location.lat;
    const lng = this.props.location.lng;

    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(lat - .01, lng - .01),
      new google.maps.LatLng(lat + .01, lng + .01)
    );

    const searchBox = new google.maps.places.SearchBox(input, { bounds });
  }

  handleInputChange(e) {
    this.setState({
      query: e.target.value,
    }, this.updateResults);
    hashHistory.push('/');
  }

  updateResults() {
    const loc = new google.maps.LatLng(this.props.location.lat, this.props.location.lng);
    const request = {
      query: this.state.query,
      location: loc,
      radius: '150',
    };

    if (this.state.query !== '') {
      window.service.textSearch(request, addResults);
    }
  }

  render() {
    return (
      <aside>
        <div className="search">
          <i className="fa fa-search" aria-hidden="true" />
          <input
            id="searchBar"
            type="text"
            onInput={this.handleInputChange}
            placeholder="Search Places"
            value={this.state.query}
          />
        </div>
      </aside>
    );
  }
}

export default SearchBar;
