import { State as structureDefinitionType } from './structureDefinitions/types';

import { defaultState as structureDefinitionState } from './structureDefinitions/reducer';

export interface StateTree {
    structureDefinitions: structureDefinitionType
}

export const defaultStateTree: StateTree = {
    structureDefinitions: structureDefinitionState
}

export interface Action {
    type: string,
    payload?: any
}

export const defaultAction:Action = {
    type: ""
}
