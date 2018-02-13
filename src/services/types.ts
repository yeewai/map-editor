import { State as structureDefinitionType } from './structureDefinitions/types';
import { State as worldType } from './worlds/types';
import { State as mapEditorType } from './mapEditor/types';

import { defaultState as structureDefinitionState } from './structureDefinitions/reducer';
import { defaultState as worldState } from './worlds/reducer';
import { defaultState as mapEditorState } from './mapEditor/reducer';

export interface StateTree {
    structureDefinitions: structureDefinitionType,
    worlds: worldType,
    mapEditor: mapEditorType
}

export const defaultStateTree: StateTree = {
    structureDefinitions: structureDefinitionState,
    worlds: worldState,
    mapEditor: mapEditorState
}

export interface Action {
    type: string,
    payload?: any
}

export const defaultAction:Action = {
    type: ""
}
