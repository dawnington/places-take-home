import React from 'react';
import hashHistory from 'react-router/lib/hashHistory';

class IndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    hashHistory.push(`results/${this.props.place.id}`);
  }

  render() {
    return (
      <div className="index-detail" onClick={this.handleClick}>
        <h4>{this.props.label}. {this.props.place.name}</h4>
      </div>
    );
  }
}


export default IndexItem;
