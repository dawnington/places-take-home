import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import MapConstants from '../constants/MapConstants';

const MapStore = new Store(Dispatcher);

function updateLocation(location) {
  MapStore.__emitChange();
}

MapStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case MapConstants.LOCATION_UPDATED:
      updateLocation();
      break;
    default:
      break;
  }
};

export default MapStore;
