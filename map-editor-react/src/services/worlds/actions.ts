import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { World } from './types';
import { StateTree, Action } from 'services/types';
import * as api from 'api';
import _ from 'lodash';

import { modalActions } from '@evercourse/ever-modal';
import { structureDefinitionsSelectors } from 'services/structureDefinitions';

export const requestWorlds: ActionCreator<Action> = () => ({
    type: 'world/REQUEST'
});

export const receiveWorlds: ActionCreator<Action> = ( worlds: World[] )=> ({
    type: 'world/RECEIVE',
    payload: worlds
});

export const setError: ActionCreator<Action> = (jqXHR: any, textStatus: string, errorThrown: any) => ({
    type: 'world/SET_ERROR',
    payload: { jqXHR, textStatus, errorThrown }
});

//I have no idea what the last return type is so I set it to any.........
export const fetchWorlds: ActionCreator<ThunkAction<any, StateTree, void>> = () => {
    return (dispatch: Dispatch<StateTree>): any => {
        dispatch(requestWorlds());
        return api.getWorlds().then (
            resp => dispatch(receiveWorlds(resp)),
            (jqXHR, textStatus, errorThrown) =>{
                 dispatch(setError(jqXHR, textStatus, errorThrown))
             }
        );
    };
};

const putWorld: ActionCreator<Action> = () => ({
    type: 'world/PUT'
});

export const updateWorld: ActionCreator<ThunkAction<any, StateTree, void>> = (values) => {
    return (dispatch: Dispatch<StateTree>, getState: () => StateTree ) => {

        dispatch(putWorld());
        return dispatch(processWorld(values));
    };
}

const createWorld: ActionCreator<Action> = () => ({
    type: 'world/CREATE'
});

export const addWorld: ActionCreator<ThunkAction<any, StateTree, void>> = (values) => {
    return (dispatch: Dispatch<StateTree>, getState: () => StateTree ) => {

        dispatch(createWorld());

        return dispatch(processWorld(values));
    };
}

// const processingWorld: ActionCreator<Action> = () => ({
//     type: 'world/PROCESS'
// });
export const processWorld: ActionCreator<ThunkAction<any, StateTree, void>> = (values) => {
    return (dispatch: Dispatch<StateTree>, getState: () => StateTree ) => {

        return api.createWorld(values).then(
            resp => {
                dispatch(modalActions.hideModal());
                dispatch(fetchWorlds());
            },
            (jqXHR, textStatus, errorThrown) => dispatch(setError(jqXHR, textStatus, errorThrown))
        );
    };
}
