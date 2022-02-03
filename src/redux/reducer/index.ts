import { combineReducers } from 'redux';
import { intialState } from './intial';
import { loadingReducer } from './LoadingReducer';
import { modelContext } from './ModalAction';
import { userDataReducer } from './userData';

const rootReducer = combineReducers({
  INTIAL: intialState,
  modelContext: modelContext,
  loading: loadingReducer,
  userData: userDataReducer,
});
export default rootReducer;
