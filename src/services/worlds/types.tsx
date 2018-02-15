import { structureDefinitionTypes } from 'services/structureDefinitions';

export interface Structure {
    name: string,
    description?: string,
    definitionId: string,
    definition?: structureDefinitionTypes.StructureDefinition
    xposition: number,
    yposition: number
}

export const emptyStructure = {
    name: "",
    definitionId: structureDefinitionTypes.emptyStructureDefintion.id,
    definition: structureDefinitionTypes.emptyStructureDefintion,
    xposition: 1,
    yposition: 1
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
    structures?: Structure[],
    nullStructureId: string
}

export const emptyWorld = {
    id: "",
    name: "",
    key: "",
    width: 1,
    length: 1,
    createdAt: 1,
    isPublished: false,
    structures: [ emptyStructure ],
    nullStructureId: structureDefinitionTypes.emptyStructureDefintion.id
}

export interface WorldWithBoard extends World {
    board: Structure[][],
    uniqueStructures: structureDefinitionTypes.StructureDefinition[]
}

export const emptyWorldWithBoard = {
    ...emptyWorld,
    board: [
        [ emptyStructure ]
    ],
    uniqueStructures: [ structureDefinitionTypes.emptyStructureDefintion ]
}

export interface State {
    items: World[],
    isFetching: boolean,
    hasFetched: boolean,
    error?: string
}
