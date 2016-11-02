import React from 'react';
import Map from './Map';
import SearchBar from './SearchBar';
import PlaceIndex from './PlaceIndex';

function App(props) {
  return (
    <div className="content-main">
      <section className="content-left">
        <h1>Places</h1>
        <SearchBar />
        <PlaceIndex />
      </section>
      {props.children}
      <section className="content-right">
        <Map />
      </section>
    </div>
  );
}

export default App;
