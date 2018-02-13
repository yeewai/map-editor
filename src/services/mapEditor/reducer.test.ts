import mapEditorReducer, { defaultState, ZOOMRATE, MAXZOOM, PANRATE } from './reducer';
import { Action, defaultAction } from 'services/types';

import $ from 'jquery';

describe("Reducers/mapEditor", () => {
    let action: Action, prevState;

    beforeEach( () => {
        action = $.extend(true, {}, defaultAction);
        prevState =  $.extend(true, {}, defaultState);
    })

    it ("renders the initial state", () => {
        expect(mapEditorReducer(undefined, action)).toEqual(defaultState);
    });

    describe("Zoom > ", () => {
        it("zooms in", () => {
            action.type = "mapEditor/ZOOMIN";

            const state = mapEditorReducer(defaultState, action )
            expect(state.zoom).toBe(ZOOMRATE)
        });

        it("zooms in but maxes out", () => {
            action.type = "mapEditor/ZOOMIN";
            prevState.zoom = MAXZOOM;

            const state = mapEditorReducer(prevState, action )
            expect(state.zoom).toBe(MAXZOOM)
        });

        it("zooms out", () => {
            action.type = "mapEditor/ZOOMOUT";

            const state = mapEditorReducer(defaultState, action )
            expect(state.zoom).toBe(defaultState.zoom/ZOOMRATE)
        });

        it("resets the zoom", () => {
            action.type = "mapEditor/ZOOMRESET";
            prevState.zoom = MAXZOOM;

            const state = mapEditorReducer(prevState, action )
            expect(state.zoom).toBe(defaultState.zoom)
        });
    })

    describe("Pan > ", () => {
        it("pans up", () => {
            action.type = "mapEditor/PANUP";

            const state = mapEditorReducer(defaultState, action )
            expect(state.panV).toBe(-PANRATE)
        });

        it("pans down", () => {
            action.type = "mapEditor/PANDOWN";

            const state = mapEditorReducer(defaultState, action )
            expect(state.panV).toBe(PANRATE)
        });

        it("pans left", () => {
            action.type = "mapEditor/PANLEFT";

            const state = mapEditorReducer(defaultState, action )
            expect(state.panH).toBe(-PANRATE)
        });

        it("pans right", () => {
            action.type = "mapEditor/PANRIGHT";

            const state = mapEditorReducer(defaultState, action )
            expect(state.panH).toBe(PANRATE)
        });

        it("resets pan", () => {
            action.type = "mapEditor/PANRESET";
            prevState.panV = 1000;
            prevState.panH = 1000;

            const state = mapEditorReducer(prevState, action )
            expect(state.panH).toBe(defaultState.panH)
            expect(state.panV).toBe(defaultState.panV)
        });
    })

});
