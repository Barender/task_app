import { createStore, applyMiddleware } from "redux";
// redux dev tools extension
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
// root reducer (combination) of all reducers
import rootReducer from "./root.reducer";
import rootSaga from "./root.saga";

const sagaMiddleware = createSagaMiddleware();
const initialState = {};

// store config
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// allow saga run services
sagaMiddleware.run(rootSaga);

export default store;
