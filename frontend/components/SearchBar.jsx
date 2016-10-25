import React from 'react';
import { addResults } from '../actions/ResultActions';
import ResultStore from '../stores/ResultStore';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.updateResults = this.updateResults.bind(this);
    this.state = {
      query: '',
      results: {},
    };
  }

  componentDidMount() {
    this.listener = ResultStore.addListener(this.handleStoreChange);
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  handleStoreChange() {
    this.setState({ results: ResultStore.all() });
  }

  handleInputChange(e) {
    this.setState({
      query: e.target.value,
    }, this.updateResults);
    // window.service.textSearch({ query: this.state.query }, addResults);
  }

  updateResults() {
    const loc = new google.maps.LatLng(this.props.location.lat, this.props.location.lng);
    const request = {
      query: this.state.query,
      location: loc,
      radius: '500',
    };

    if (this.state.query !== '') {
      window.service.textSearch(request, addResults);
    } else {
      this.setState({ results: {} });
    }
  }

  render() {
    return (
      <aside>
        <div>
          <i className="fa fa-search" aria-hidden="true" />
          <input
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
