import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StructureDefinition } from './types';
import { StateTree, Action } from 'services/types';
import * as api from 'api';

import { modalActions } from '@evercourse/ever-modal';

// -------------------------------------------------------------
// Parsing the images for their size
// -------------------------------------------------------------
export const requestSDImageSize: ActionCreator<Action> = () => ({
    type: 'structureDefinition/REQUEST_IMAGE'
});

export const receiveSDImageSize: ActionCreator<Action> = ( image: any, definition: StructureDefinition )=> ({
    type: 'structureDefinition/RECEIVE_IMAGE',
    payload: { image, definition }
});

export const fetchSDImageSize: ActionCreator<ThunkAction<any, StateTree, void>> = ( definition ) => {
    return (dispatch: Dispatch<StateTree>): any => {
        dispatch(requestSDImageSize());
        return api.getImage(definition.imageUrl).then (
            resp => dispatch(receiveSDImageSize(resp, definition)),
            (jqXHR, textStatus, errorThrown) =>{
                 dispatch(setError(jqXHR, textStatus, errorThrown))
             }
        );
    };
};

// -------------------------------------------------------------
// Structure Definitions
// -------------------------------------------------------------
export const requestStructureDefinitions: ActionCreator<Action> = () => ({
    type: 'structureDefinition/REQUEST'
});

export const receiveStructureDefinitions: ActionCreator<Action> = ( definitions: StructureDefinition[] )=> ({
    type: 'structureDefinition/RECEIVE',
    payload: definitions
});

export const setError: ActionCreator<Action> = (jqXHR: any, textStatus: string, errorThrown: any) => ({
    type: 'structureDefinition/SET_ERROR',
    payload: { jqXHR, textStatus, errorThrown }
});

//I have no idea what the last return type is so I set it to any.........
export const fetchStructureDefinitions: ActionCreator<ThunkAction<any, StateTree, void>> = () => {
    return (dispatch: Dispatch<StateTree>): any => {
        dispatch(requestStructureDefinitions());
        return api.getStructureDefinitions().then (
            resp => {
                dispatch(receiveStructureDefinitions(resp))
                resp.forEach( r => { dispatch(fetchSDImageSize(r)) })
            },
            (jqXHR, textStatus, errorThrown) =>{
                 dispatch(setError(jqXHR, textStatus, errorThrown))
             }
        );
    };
};

const putStructureDefinition: ActionCreator<Action> = () => ({
    type: 'structureDefinition/PUT'
});

export const updateStructureDefinition: ActionCreator<ThunkAction<any, StateTree, void>> = (values) => {
    return (dispatch: Dispatch<StateTree>, getState: () => StateTree ) => {

        dispatch(putStructureDefinition());
        return api.updateStructureDefinition(values.id, values).then(
            resp => {
                dispatch(modalActions.hideModal());
                dispatch(fetchStructureDefinitions());
            },
            (jqXHR, textStatus, errorThrown) => dispatch(setError(jqXHR, textStatus, errorThrown))
        );
    };
}

const createStructureDefinition: ActionCreator<Action> = () => ({
    type: 'structureDefinition/CREATE'
});

export const addStructureDefinition: ActionCreator<ThunkAction<any, StateTree, void>> = (values) => {
    return (dispatch: Dispatch<StateTree>, getState: () => StateTree ) => {

        dispatch(createStructureDefinition());
        return api.createStructureDefinition(values).then(
            resp => {
                dispatch(modalActions.hideModal());
                dispatch(fetchStructureDefinitions());
            },
            (jqXHR, textStatus, errorThrown) => dispatch(setError(jqXHR, textStatus, errorThrown))
        );
    };
}
