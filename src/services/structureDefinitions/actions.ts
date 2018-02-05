import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { StructureDefinition } from './types';
import { StateTree, Action } from 'services/types';
import * as api from 'api';

import { modalActions } from 'ever-modal';

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
            resp => dispatch(receiveStructureDefinitions(resp)),
            (jqXHR, textStatus, errorThrown) =>{
                 dispatch(setError(jqXHR, textStatus, errorThrown))
             }
        );
    };
};

export const putStructureDefinition: ActionCreator<Action> = () => ({
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
