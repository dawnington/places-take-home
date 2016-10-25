import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/Dispatcher';
import ResultConstants from '../constants/ResultConstants';

const ResultStore = new Store(Dispatcher);

let _results = {};

function setResults(results) {
  _results = results;
  ResultStore.__emitChange();
}

ResultStore.all = function () {
  return _results;
};

ResultStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ResultConstants.RESULTS_RECEIVED:
      setResults(payload.results);
      break;
    default:
      break;
  }
};

export default ResultStore;
