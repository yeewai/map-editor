import { Action } from 'services/types';
import * as Types from './types';

export const defaultState: Types.State = {
    zoom: 1,
    panV: 0,
    panH: 0
}

export const ZOOMRATE = 1.5;
export const MAXZOOM = 10;
export const PANRATE = 1;

const mapEditorReducer = (state = defaultState, action: Action ): Types.State => {
    switch(action.type) {
        case 'mapEditor/ZOOMIN':
            return { ...state, zoom: Math.min(state.zoom * ZOOMRATE, MAXZOOM) };
        case 'mapEditor/ZOOMOUT':
            return { ...state, zoom: state.zoom / ZOOMRATE };
        case 'mapEditor/ZOOMRESET':
            return { ...state, zoom: defaultState.zoom };
        case 'mapEditor/PANUP':
            return {...state, panV: state.panV - PANRATE}
        case 'mapEditor/PANDOWN':
            return {...state, panV: state.panV + PANRATE}
        case 'mapEditor/PANLEFT':
            return {...state, panH: state.panH - PANRATE}
        case 'mapEditor/PANRIGHT':
            return {...state, panH: state.panH + PANRATE}
        case 'mapEditor/PANRESET':
            return {...state, panH: defaultState.panH, panV: defaultState.panV}
        default:
            return state;
    }
}


export default mapEditorReducer;
