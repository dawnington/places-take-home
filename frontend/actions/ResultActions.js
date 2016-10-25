import Dispatcher from '../dispatcher/Dispatcher';
import ResultConstants from '../constants/ResultConstants';

function addResults(results) {
  console.log(results);
  Dispatcher.dispatch({
    actionType: ResultConstants.RESULTS_RECEIVED,
    results,
  });
}

export { addResults };
