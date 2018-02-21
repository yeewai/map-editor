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

    it("tracks the highlighted build structure", () => {
        action.type = "mapEditor/SET_BUILD_STRUCTUREDEFINITION";
        action.payload = "a";

        const state = mapEditorReducer(defaultState, action )
        expect(state.buildStructureDefinition).toBe("a")
    })

    it("untracks the highlighted build structure if the same one is selected", () => {
        action.type = "mapEditor/SET_BUILD_STRUCTUREDEFINITION";
        action.payload = "a";

        const state = mapEditorReducer({buildStructureDefinition: "a"}, action )
        expect(state.buildStructureDefinition).toBe(defaultState.buildStructureDefinition)
    })

    it("sets the mouse position", () => {
        action.type = "mapEditor/SET_MOUSE_POSITION";
        action.payload = "a";

        const state = mapEditorReducer(defaultState, action )
        expect(state.mousePosition).toBe("a")
    })

    it("sets the active world", () => {
        action.type = "mapEditor/SET_ACTIVE";
        action.payload = "a";

        const state = mapEditorReducer(defaultState, action )
        expect(state.activeWorld).toBe("a")
    })

    describe("Handling mouse click", () => {
        beforeEach( () => {
            action.type = "mapEditor/MOUSE_CLICK";
        })

        it ("does nothing if there is no mouse position or buildStructureDefinition", () => {

            [
                { mousePosition: null, buildStructureDefinition: null },
                { mousePosition: "a", buildStructureDefinition: null }
            ].forEach( s => {
                const state = mapEditorReducer(s, action )
                expect(state).toMatchObject(s)
            })
        })

        it ("puts the new building on the map", () => {
            const buildStructureDefinition = {id: "a"};
            const prevState = { mousePosition: {x: 1, y: 2}, buildStructureDefinition, activeWorld: {} };

            const state = mapEditorReducer(prevState, action )
            expect(state.activeWorld.structures[0].definition).toMatchObject(buildStructureDefinition)

        })
    })
});
