import Dispatcher from '../dispatcher/Dispatcher';
import getLocation from '../util/MapUtil';
import MapConstants from '../constants/MapConstants';

function receiveLocation(location) {
  Dispatcher.dispatch({
    actionType: MapConstants.LOCATION_RECEIVED,
    location,
  });
}

function fetchLocation() {
  getLocation(receiveLocation);
}

export { fetchLocation };
