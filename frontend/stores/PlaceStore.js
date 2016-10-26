import { Store } from 'flux/utils';
import _ from 'lodash';
import Dispatcher from '../dispatcher/Dispatcher';
import PlaceConstants from '../constants/PlaceConstants';

const PlaceStore = new Store(Dispatcher);

let _places = {};

function setPlaces(places) {
  _places = {};
  for (let place of places) {
    _places[place.id] = place;
  }
  PlaceStore.__emitChange();
}

PlaceStore.all = function () {
  return _.values(_places);
};

PlaceStore.place = function (id) {
  return _places[id];
};

PlaceStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PlaceConstants.PLACES_RECEIVED:
      setPlaces(payload.results);
      break;
    default:
      break;
  }
};

export default PlaceStore;
