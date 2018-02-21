import { Action } from 'services/types';
import * as Types from './types';
import { worldTypes } from 'services/worlds';

export const defaultState: Types.State = {
    zoom: 1,
    panV: 0,
    panH: 0,
    buildStructureDefinition: undefined,
    mousePosition: undefined,
    activeWorld: undefined
}

export const ZOOMRATE = 1.5;
export const MAXZOOM = 10;
export const PANRATE = 1;

const mapEditorReducer = (state = defaultState, action: Action ): Types.State => {
    switch(action.type) {
        case 'mapEditor/SET_ACTIVE':
            return { ...state, activeWorld: action.payload };
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
        case 'mapEditor/SET_BUILD_STRUCTUREDEFINITION':
            const sd = action.payload === state.buildStructureDefinition
                ? defaultState.buildStructureDefinition
                : action.payload;
            return {...state, buildStructureDefinition: sd}
        // Will probably use this for keyboard controls
        // case 'mapEditor/UNSET_BUILD_STRUCTUREDEFINITION':
        //     return {...state, buildStructureDefinition: defaultState.buildStructureDefinition}
        //
        case 'mapEditor/SET_MOUSE_POSITION':
            return {...state, mousePosition: action.payload }

        case 'mapEditor/MOUSE_CLICK':
            const { mousePosition, buildStructureDefinition } = state;
            if (!(mousePosition && buildStructureDefinition)) { return state; }

            const newStructure: worldTypes.Structure = {
                ...worldTypes.emptyStructure,
                name: "",
                definitionId: buildStructureDefinition.id,
                definition: buildStructureDefinition,
                xposition: mousePosition.x ,
                yposition: mousePosition.y
            }

            return {
                ...state,
                activeWorld: {
                    ...state.activeWorld,
                    structures: [
                        ...state.activeWorld.structures || [],
                        newStructure
                    ]
                }
            };

        default:
            return state;
    }
}


export default mapEditorReducer;
