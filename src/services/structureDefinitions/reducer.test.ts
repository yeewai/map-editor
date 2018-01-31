import structureDefinitionReducer, { defaultState } from './reducer';

describe("Reducers/structureDefinition", () => {

    it ("renders the initial state", () => {
        expect(structureDefinitionReducer(undefined, {})).toEqual(defaultState);
    });

    it("handles getting structureDefinition", () => {
        expect(structureDefinitionReducer({}, {type: "structureDefinition/REQUEST"}))
            .toEqual({
                isFetching: true,
                error: undefined
            });
    });

    it("handles having gotten structureDefinition", () => {
        expect(structureDefinitionReducer({}, {type: "structureDefinition/RECEIVE"}))
            .toEqual({
                isFetching: false,
                hasFetched: true,
                error: undefined
            });
    });

    it("handles failing to get structureDefinition", () => {
        expect(structureDefinitionReducer({}, {type: "structureDefinition/SET_ERROR"}))
            .toEqual({
                error: 'Error loading structureDefinition.'
            });
    });

});
