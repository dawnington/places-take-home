import React from 'react';
import hashHistory from 'react-router/lib/hashHistory';
import PlaceStore from '../stores/PlaceStore';

class PlaceIndex extends React.Component {
  constructor(props) {
    super(props);
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.state = { places: [] };
  }

  componentDidMount() {
    this.listener = PlaceStore.addListener(this.handleStoreChange);
  }

  componentWillUnmount() {
    this.listener.remove();
  }

  handleStoreChange() {
    this.setState({ places: PlaceStore.all() });
  }

  handleClick(id) {
    hashHistory.push(`results/${id}`);
  }

  render() {
    let labelIndex = 0;
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return (
      <div className="index">
        {
          this.state.places.map((place, i) =>
            <div
              className="index-detail"
              key={i}
              onClick={this.handleClick.bind(this, place.id)}
            >
              <h4>{labels[labelIndex++ % labels.length]}. {place.name}</h4>
            </div>
          )
        }
      </div>
    );
  }
}

export default PlaceIndex;
