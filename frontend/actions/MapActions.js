import Dispatcher from '../dispatcher/Dispatcher';
import MapConstants from '../constants/MapConstants';

function updateLocation() {
  Dispatcher.dispatch({
    actionType: MapConstants.LOCATION_UPDATED,
  });
}

export { updateLocation };
