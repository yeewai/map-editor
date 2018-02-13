import structureDefinitionReducer, { defaultState } from './reducer';
import { Action, defaultAction } from 'services/types';

import $ from 'jquery';

describe("Reducers/structureDefinition", () => {
    let action: Action;

    beforeEach( () => {
        action = $.extend(true, {}, defaultAction);
    })

    it ("renders the initial state", () => {
        expect(structureDefinitionReducer(undefined, action)).toEqual(defaultState);
    });

    it("handles getting structureDefinition", () => {
        action.type = "structureDefinition/REQUEST";
        action.payload = [1,2];

        const state = structureDefinitionReducer(defaultState, action )
        expect(state.isFetching).toBe(true)
        expect(state.error).toBe(undefined)
    });

    it("handles having gotten structureDefinition", () => {
        action.type ="structureDefinition/RECEIVE";
        action.payload = [1,2];

        expect(structureDefinitionReducer(undefined, action ))
            .toEqual({
                isFetching: false,
                hasFetched: true,
                error: undefined,
                items: [],
                itemsRequested: 2
            });
    });

    it("handles failing to get structureDefinition", () => {
        action.type = "structureDefinition/SET_ERROR";
        expect(structureDefinitionReducer(undefined, action).error)
            .toEqual( 'Error loading structureDefinition.');
    });

});
