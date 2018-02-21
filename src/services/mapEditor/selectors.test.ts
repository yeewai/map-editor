import sinon from 'sinon';

import * as mapEditorSelectors from './selectors';
import { worldTypes } from 'services/worlds';
import { structureDefinitionTypes } from 'services/structureDefinitions';

describe("Mape Editor Selectors > ", () => {
    const sds = [
        {
            ...structureDefinitionTypes.emptyStructureDefintion,
            id: "a"
        }
    ]

    it("gets the highlighted build structure", () => {
        expect(mapEditorSelectors.getBuildStructureDefinition({mapEditor: { buildStructureDefinition: "a"}})).toEqual("a")
    })

    it("gets the mouse position", () => {
        expect(mapEditorSelectors.getMousePosition({mapEditor: { mousePosition: "a"}})).toEqual("a")
    })

    describe("getActiveWorldWithDefinition > ", () => {
        it ("returns null if there is no valid world", () => {
            const result = mapEditorSelectors.getActiveWorldWithDefinition.resultFunc( null, sds );
            expect(result).toBeNull();
        })

        it("gets the worlds with definitions", () => {
            const world = {
                ...worldTypes.emptyWorld,
                structures: [
                    {
                        ...worldTypes.emptyStructure,
                        definitionId: "a"
                    }
                ]
            }
            const result = mapEditorSelectors.getActiveWorldWithDefinition.resultFunc( world, sds );
            expect(result.structures[0].withDefinition).toBe(true);
            expect(result.structures[0].definition).toEqual(sds[0]);
        })

        it("gets the worlds if they don't have any structures", () => {
            const world = {
                ...worldTypes.emptyWorld,
                structures: []
            }
            const result = mapEditorSelectors.getActiveWorldWithDefinition.resultFunc( world, sds );
            expect(result).toMatchObject(world);
        })
    } );

    describe ("getActiveWorldWithBoard > ", () => {
        it ("returns null if there is no valid world", () => {
            const result = mapEditorSelectors.getActiveWorldWithBoard.resultFunc( null, sds );
            expect(result).toBeNull();
        })

        it ("gets world with board", () => {
            const world = {
                ...worldTypes.emptyWorld,
                createdAt: 1,
                width: 3,
                length: 3
            }

            const result = mapEditorSelectors.getActiveWorldWithBoard.resultFunc( world, sds );
            expect(result.board).toBeDefined();
            expect(result.uniqueStructures).toBeDefined();
        })

        it ("gets the unique structure definitions in the world", () => {
            const world = {
                ...worldTypes.emptyWorld,
                createdAt: 1,
                width: 3,
                length: 3,
                structures: [{
                    ...worldTypes.emptyStructure,
                    definition: { ...structureDefinitionTypes.emptyStructureDefintion, id: "b"}
                }]
            }

            const results = mapEditorSelectors.getUniqueStructuresInWorld( world );
            expect(results).toHaveLength(1);

            const resultIds = results.map(r => r.id);
            expect(resultIds).toContain("b");
        })

        it ("gets the unique structure definitions in the world even if there none", () => {
            const world = {
                ...worldTypes.emptyWorld,
                createdAt: 1,
                width: 3,
                length: 3,
                structures: null
            }

            const results = mapEditorSelectors.getUniqueStructuresInWorld( world );
            expect(results).toHaveLength(0);
        })

        it ("populates the board with structures in the world", () => {
            const world = {
                ...worldTypes.emptyWorld,
                nullStructureId: "a",
                createdAt: 1,
                width: 3,
                length: 3,
                structures: [{
                    ...worldTypes.emptyStructure,
                    xposition: 1,
                    yposition: 1,
                    definition: { ...structureDefinitionTypes.emptyStructureDefintion, id: "b"}
                }]
            }

            const results = mapEditorSelectors.getBoardFromWorld( world, sds[0] );
            expect(results).toHaveLength(3);

            expect(results[0][0]).toBeNull();
            expect(results[0][1]).toBeNull();
            expect(results[0][2]).toBeNull();
            expect(results[1][0]).toBeNull();
            expect(results[1][1].definition.id).toEqual("b"); //<-- Here's a structure
            expect(results[1][2]).toBeNull();
            expect(results[2][0]).toBeNull();
            expect(results[2][1]).toBeNull();
            expect(results[2][2]).toBeNull();
        });

        it ("returns a null board if there are no structures in the world", () => {
            const world = {
                ...worldTypes.emptyWorld,
                nullStructureId: "a",
                createdAt: 1,
                width: 3,
                length: 3,
                structures: null
            }

            const results = mapEditorSelectors.getBoardFromWorld( world, sds[0] );
            expect(results).toHaveLength(3);

            expect(results[0][0]).toBeNull();
            expect(results[0][1]).toBeNull();
            expect(results[0][2]).toBeNull();
            expect(results[1][0]).toBeNull();
            expect(results[1][1]).toBeNull();
            expect(results[1][2]).toBeNull();
            expect(results[2][0]).toBeNull();
            expect(results[2][1]).toBeNull();
            expect(results[2][2]).toBeNull();
        })


    })
})
