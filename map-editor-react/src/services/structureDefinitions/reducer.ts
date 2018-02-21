import { Action } from 'services/types';
import * as Types from './types';

export const defaultState: Types.State = {
    isFetching: false,
    hasFetched: false,
    error: undefined,
    items: [],
    itemsRequested: 0
}

const structureDefinitionReducer = (state = defaultState, action: Action ): Types.State => {
    switch(action.type) {
        case 'structureDefinition/REQUEST':
            return { ...state, isFetching: true, error: undefined, items: defaultState.items };
        case 'structureDefinition/RECEIVE':
            return {
                ...state,
                isFetching: false,
                hasFetched: true,
                error: undefined,
                itemsRequested: action.payload.length
            };
        case 'structureDefinition/SET_ERROR':
            return { ...state, error: 'Error loading structureDefinition.' };
        case 'structureDefinition/REQUEST_IMAGE':
            return { ...state, isFetching: true, error: undefined};
        case 'structureDefinition/RECEIVE_IMAGE':
            const { image, definition } = action.payload;
            // If SVG
            const svg = image.querySelector('svg');
            const box = svg ? svg.viewBox.baseVal : undefined;
            // TODO: What do i do if it's not an svg???????

            const item = {
                ...definition,
                imageWidth: box.width,
                imageHeight: box.height,
                image: svg
            }

            return {
                ...state,
                isFetching: false,
                hasFetched: true,
                error: undefined,
                items: [
                    ...state.items,
                    item
                ],
            };
        default:
            return state;
    }
}


export default structureDefinitionReducer;
