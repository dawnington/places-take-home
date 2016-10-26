import React from 'react';
import PlaceStore from '../stores/PlaceStore';
import IndexItem from './IndexItem';

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

  render() {
    let labelIndex = 0;
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return (
      <div className="index">
        {
          this.state.places.map(place =>
            <IndexItem
              key={place.id}
              place={place}
              label={labels[labelIndex++ % labels.length]}
            />
          )
        }
      </div>
    );
  }
}

export default PlaceIndex;
