import React from 'react';
import PlaceStore from '../stores/PlaceStore';

function getPhoto(place) {
  const photos = place.photos;
  if (!photos) {
    return;
  }

  return photos[0].getUrl({ maxWidth: 200, maxHeight: 200 });
}

function openStatus(place) {
  if (!place.opening_hours) { return ''; }

  const open = place.opening_hours.open_now;

  if (open) {
    return <p className="open">Open Now</p>;
  }

  return <p className="closed">Closed</p>;
}

function PlaceDetail(props) {
  const place = PlaceStore.place(props.params.id);
  const photoURL = getPhoto(place);
  const status = openStatus(place);

  return (
    <div className="detail">
      <img src={photoURL} alt="" className="place-photo" />
      <h4>{place.name}</h4>
      {status}
      {place.formatted_address}
    </div>
  );
}

export default PlaceDetail;
