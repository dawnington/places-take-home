import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import MapConstants from '../constants/MapConstants';

const MapStore = new Store(Dispatcher);

let _location = { lat: 0, lng: 0 };

function setLocation(location) {
  _location.lat = location.coords.latitude;
  _location.lng = location.coords.longitude;
  MapStore.__emitChange();
}

MapStore.location = function () {
  return _location;
};

MapStore.hasLocation = function () {
  if (_location.lat !== 0) {
    return true;
  }
  return false;
};

MapStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case MapConstants.LOCATION_RECEIVED:
      setLocation(payload.location);
      break;
    default:
      break;
  }
};

export default MapStore;
