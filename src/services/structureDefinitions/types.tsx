export interface StructureDefinition {
    id: string,
    name: string,
    description?: string,
    width: number,
    length: number,
    kind: string,
    imageUrl: string
}

export interface State {
    items: StructureDefinition[],
    isFetching: boolean,
    hasFetched: boolean,
    error?: string
}
