import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      query: '',
      matches: [],
      focusedIdx: 0,
    };
  }

  handleInputChange(e) {
    this.setState({
      query: e.target.value,
      focusedIdx: 0,
    });
  }

 //  handleKeyDown(e) {
 //   if (e.keyCode === 13 || e.keyCode === 39) { //enter or right arrow
 //     this.handleClick(this.state.matches[this.state.focusedIdx]);
 //   } else if (e.keyCode === 38) {
 //     if (this.state.focusedIdx > 0) { //up arrow
 //       let focusedIdx = this.state.focusedIdx - 1;
 //       this.setState({ focusedIdx: focusedIdx });
 //     }
 //   } else if (e.keyCode === 40) { //down arrow
 //     if (this.state.focusedIdx < this.state.matches.length - 1) {
 //       let focusedIdx = this.state.focusedIdx + 1;
 //       this.setState({ focusedIdx: focusedIdx })
 //     }
 //   }
 // }

  render() {
    return (
      <aside>
        <div>
          <i className="fa fa-search" aria-hidden="true"></i>
          <input type="text"
                 onInput={this.handleInputChange}
                 placeholder="Search Places"
                 value={this.state.query}/>
        </div>
      </aside>
    );
  }
}

export default SearchBar;
