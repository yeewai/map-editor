import { State as structureDefinitionType } from './structureDefinitions/types';

export interface StateTree {
    structureDefinitions: structureDefinitionType
}

export interface Action {
    type: string,
    payload?: any
}
