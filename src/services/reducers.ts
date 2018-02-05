import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { modalReducer } from 'ever-modal';
import { reducer as formReducer } from 'redux-form'

import { StateTree } from './types';
import structureDefinitions from './structureDefinitions';

const rootReducer = combineReducers<StateTree>({
    router: routerReducer,
    modals: modalReducer,
    form: formReducer,
    structureDefinitions
});

export default rootReducer;
