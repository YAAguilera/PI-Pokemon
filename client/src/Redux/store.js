import { compose, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk"
import rootReducer from "./reducer";


const composeEnhancer = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;