import { structureDefinitionTypes } from 'services/structureDefinitions';

export interface Structure {
    name: string,
    description?: string,
    definitionId: string,
    definition?: structureDefinitionTypes.StructureDefinition
    xposition: number,
    yposition: number
}

export interface World {
    id: string,
    name: string,
    key: string,
    description?: string,
    width: number,
    length: number,
    createdAt: number,
    saveMessage?: string,
    isPublished: boolean,
    structures?: Structure[]
}

export interface State {
    items: World[],
    isFetching: boolean,
    hasFetched: boolean,
    error?: string
}
