import { ActionCreator } from 'redux';
import { Action } from 'services/types';

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
