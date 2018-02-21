export interface StructureDefinition {
    id: string,
    name: string,
    description?: string,
    width: number,
    length: number,
    kind: string,
    imageUrl: string,
    imageWidth?: number,
    imageHeight?: number,
    image?: any
}

export const emptyStructureDefintion = {
    id: "",
    name: "",
    width: 1,
    length: 1,
    kind: "",
    imageUrl: ""
}

export interface State {
    items: StructureDefinition[],
    itemsRequested: number,
    isFetching: boolean,
    hasFetched: boolean,
    error?: string
}
