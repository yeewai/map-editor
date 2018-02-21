import { ActionCreator } from 'redux';
import { Action } from 'services/types';

import { structureDefinitionTypes } from 'services/structureDefinitions';
import { worldTypes } from 'services/worlds';

// -------------------------------------------------------------
// "Camera" controls
// -------------------------------------------------------------
export const zoomIn: ActionCreator<Action> = () => ({
    type: 'mapEditor/ZOOMIN'
});

export const zoomOut: ActionCreator<Action> = () => ({
    type: 'mapEditor/ZOOMOUT'
});

export const zoomReset: ActionCreator<Action> = () => ({
    type: 'mapEditor/ZOOMRESET'
});

export const panLeft: ActionCreator<Action> = () => ({
    type: 'mapEditor/PANLEFT'
});

export const panRight: ActionCreator<Action> = () => ({
    type: 'mapEditor/PANRIGHT'
});

export const panUp: ActionCreator<Action> = () => ({
    type: 'mapEditor/PANUP'
});

export const panDown: ActionCreator<Action> = () => ({
    type: 'mapEditor/PANDOWN'
});

export const panReset: ActionCreator<Action> = () => ({
    type: 'mapEditor/PANRESET'
});

// -------------------------------------------------------------
// Editing controls
// -------------------------------------------------------------
export const setStructureDefinition: ActionCreator<Action> = (sd: structureDefinitionTypes.StructureDefinition ) => ({
    type: 'mapEditor/SET_BUILD_STRUCTUREDEFINITION',
    payload: sd
});

// Gonna use this with keyboard controls probably
// export const unsetStructureDefinition: ActionCreator<Action> = () => ({
//     type: 'mapEditor/UNSET_BUILD_STRUCTUREDEFINITION'
// })

export const setMousePosition: ActionCreator<Action> = ( x: number, y: number ) => ({
    type: 'mapEditor/SET_MOUSE_POSITION',
    payload: { x, y }
});

export const mouseClick: ActionCreator<Action> = ( x: number, y: number ) => ({
    type: 'mapEditor/MOUSE_CLICK',
    payload: { x, y }
});


// -------------------------------------------------------------
// Map Editor Active World
// -------------------------------------------------------------
export const setActiveWorld: ActionCreator<Action> = ( world: worldTypes.World ) => ({
    type: 'mapEditor/SET_ACTIVE',
    payload: world
});
