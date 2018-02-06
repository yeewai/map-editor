import { State as structureDefinitionType } from './structureDefinitions/types';
import { State as worldType } from './worlds/types';

import { defaultState as structureDefinitionState } from './structureDefinitions/reducer';
import { defaultState as worldState } from './worlds/reducer';

export interface StateTree {
    structureDefinitions: structureDefinitionType,
    worlds: worldType
}

export const defaultStateTree: StateTree = {
    structureDefinitions: structureDefinitionState,
    worlds: worldState
}

export interface Action {
    type: string,
    payload?: any
}

export const defaultAction:Action = {
    type: ""
}
