import sinon from 'sinon';
import $ from 'jquery';

import structureDefinitionReducer, { defaultState } from './reducer';
import { Action, defaultAction } from 'services/types';

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


    describe("Requesting structure definition image", () => {
        it("handles getting structureDefinition", () => {
            action.type = "structureDefinition/REQUEST_IMAGE";

            const state = structureDefinitionReducer(defaultState, action )
            expect(state.isFetching).toBe(true)
            expect(state.error).toBe(undefined)
        });

        it("handles having gotten definition image", () => {
            const imageDef = {a: 1};
            const image = { viewBox : { baseVal: { width: 3, height: 4}}};

            const queryStub = sinon.stub().returns(image);

            action.type ="structureDefinition/RECEIVE_IMAGE";
            action.payload = { definition: imageDef, image: {querySelector: queryStub} }

            const state = structureDefinitionReducer(defaultState, action )
            expect(state.items).toContainEqual({
                ...imageDef,
                imageWidth: 3,
                imageHeight: 4,
                image
            })

        });

        xit("handles failing to get structureDefinition", () => {
            action.type = "structureDefinition/SET_ERROR";
            expect(structureDefinitionReducer(undefined, action).error)
                .toEqual( 'Error loading structureDefinition.');
        });
    })
});
