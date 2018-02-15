import { StateTree } from 'services/types';

export const getZoom = ( state: StateTree ) => state.mapEditor.zoom;
export const getPan = (state: StateTree ) => ({ h: state.mapEditor.panH, v: state.mapEditor.panV });
