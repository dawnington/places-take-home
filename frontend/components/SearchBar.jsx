/* global google */
/* eslint-env browser */

import React from 'react';
import hashHistory from 'react-router/lib/hashHistory';
import { addResults } from '../actions/ResultActions';
import MapStore from '../stores/MapStore';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMapChange = this.handleMapChange.bind(this);
    this.fetchResults = this.fetchResults.bind(this);
    this.state = { query: '' };
  }

  componentDidMount() {
    this.mapListener = MapStore.addListener(this.handleMapChange);
    const input = document.getElementById('searchBar');

    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.75637564915318, -122.49568271496582),
      new google.maps.LatLng(37.81674602158375, -122.31492328503418)
    );

    this.searchBox = new google.maps.places.SearchBox(input, { bounds });
    this.searchBox.addListener('places_changed', () => {
      addResults(this.searchBox.getPlaces());
    });
  }

  componentWillUnmount() {
    this.mapListener.remove();
  }

  handleMapChange() {
    const bounds = window.map.getBounds();
    this.searchBox.setBounds(bounds);
    this.fetchResults();
  }

  handleInputChange(e) {
    this.setState({ query: e.target.value }, this.fetchResults);
    hashHistory.push('/');
  }

  fetchResults() {
    const request = {
      query: this.state.query,
      bounds: window.map.getBounds(),
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
