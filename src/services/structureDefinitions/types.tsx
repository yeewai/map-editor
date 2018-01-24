export interface StructureDefinition {
    readonly id: string,
    readonly name: string,
    readonly description?: string,
    readonly width: number,
    readonly length: number,
    readonly kind: string,
    readonly imageUrl: string
}

export interface State {
    readonly items: StructureDefinition[],
    readonly isFetching: boolean,
    readonly hasFetched: boolean,
    readonly error?: string
}
