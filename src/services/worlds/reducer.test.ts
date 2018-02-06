import worldReducer, { defaultState } from './reducer';
import { Action, defaultAction } from 'services/types';

import $ from 'jquery';

describe("Reducers/world", () => {
    let action: Action;

    beforeEach( () => {
        action = $.extend(true, {}, defaultAction);
    })

    it ("renders the initial state", () => {
        expect(worldReducer(undefined, action)).toEqual(defaultState);
    });

    it("handles getting world", () => {
        action.type = "world/REQUEST";

        const state = worldReducer(defaultState, action )
        expect(state.isFetching).toBe(true)
        expect(state.error).toBe(undefined)
    });

    it("handles having gotten world", () => {
        action.type ="world/RECEIVE";

        expect(worldReducer(undefined, action ))
            .toEqual({
                isFetching: false,
                hasFetched: true,
                error: undefined
            });
    });

    it("handles failing to get world", () => {
        action.type = "world/SET_ERROR";
        expect(worldReducer(undefined, action).error)
            .toEqual( 'Error loading world.');
    });

});
