import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { modalReducer } from 'ever-modal';
import { reducer as formReducer } from 'redux-form'

import { StateTree } from './types';
import structureDefinitions from './structureDefinitions';
import worlds from './worlds';

const rootReducer = combineReducers<StateTree>({
    router: routerReducer,
    modals: modalReducer,
    form: formReducer,
    structureDefinitions,
    worlds

});

export default rootReducer;
