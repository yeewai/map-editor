import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import { StateTree } from './types';
import structureDefinitions from './structureDefinitions';

const rootReducer = combineReducers<StateTree>({
    router: routerReducer,
    structureDefinitions
});

export default rootReducer;
