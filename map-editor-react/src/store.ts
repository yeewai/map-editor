import { createStore } from 'redux';
import rootReducer from 'services/reducers';
import getMiddlewares from './middlewares';
import createHistory from 'history/createHashHistory';

export const history = createHistory();
const initialState = undefined;
const middlewares = getMiddlewares(history);
const store = createStore(rootReducer, initialState, middlewares);

export default store;
