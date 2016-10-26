import Dispatcher from '../dispatcher/Dispatcher';
import PlaceConstants from '../constants/PlaceConstants';

function addResults(results) {
  Dispatcher.dispatch({
    actionType: PlaceConstants.PLACES_RECEIVED,
    results,
  });
}

export { addResults };
