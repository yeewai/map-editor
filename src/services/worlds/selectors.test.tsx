import sinon from 'sinon';

import * as worldSelectors from './selectors';
import { worldTypes } from './';
import { structureDefinitionTypes } from 'services/structureDefinitions';

describe("World Selectors", () => {
    const sds = [
        {
            ...structureDefinitionTypes.emptyStructureDefintion,
            id: "a"
        }
    ]


    describe("getByKey > ", () => {
        it ("Gets the most recent world for a given key", () => {
            const sandbox = sinon.createSandbox();

            const world1 = {
                ...worldTypes.emptyWorld,
                key: "a",
                createdAt: 1
            }
            const world2 = {
                ...worldTypes.emptyWorld,
                key: "a",
                createdAt: 2
            }

            const result = worldSelectors.getByKey( {worlds: { items: [world1, world2]}}, "a");
            expect(result).toMatchObject(world2);

            sandbox.restore();
        })
    })

    describe("getWorldWithDefinitionByKey > ", () => {
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
            const result = worldSelectors.getWorldWithDefinitionByKey.resultFunc( world, sds );
            expect(result.structures[0].withDefinition).toBe(true);
            expect(result.structures[0].definition).toEqual(sds[0]);
        })

        it("gets the worlds if they don't have any structures", () => {
            const world = {
                ...worldTypes.emptyWorld,
                structures: []
            }
            const result = worldSelectors.getWorldWithDefinitionByKey.resultFunc( world, sds );
            expect(result).toMatchObject(world);
        })
    } );

    describe("getUniqueWorlds > ", () => {
        it ("gets an empty array if there are no worlds", () => {

            const results = worldSelectors.getUniqueWorlds.resultFunc( null );
            expect(results).toEqual([]);
        });

        it("gets a list of worlds unique by key", () => {
            const world1 = {
                ...worldTypes.emptyWorld,
                key: "a",
                createdAt: 1
            }
            const world2 = {
                ...worldTypes.emptyWorld,
                key: "b"
            }
            const world3 = {
                ...worldTypes.emptyWorld,
                key: "a",
                createdAt: 2
            }

            const results = worldSelectors.getUniqueWorlds.resultFunc( [world1, world2, world3], sds );
            const resultKeys = results.map(r => r.key);
            expect(resultKeys).toContainEqual(world2.key);
            expect(resultKeys).toContainEqual(world3.key);
        })

        it ("gets the most recently edited World if there are multiple", () => {
            const world1 = {
                ...worldTypes.emptyWorld,
                key: "a",
                createdAt: 1
            }
            const world2 = {
                ...worldTypes.emptyWorld,
                key: "a",
                createdAt: 2
            }

            const results = worldSelectors.getUniqueWorlds.resultFunc( [world1, world2], sds );
            expect(results).toHaveLength(1)
            expect(results[0]).toMatchObject(world2);
        })
    });

    describe ("getWorldWithBoardByKey > ", () => {
        it ("gets world with board", () => {
            const world = {
                ...worldTypes.emptyWorld,
                nullStructureId: "a",
                createdAt: 1,
                width: 3,
                length: 3
            }

            const result = worldSelectors.getWorldWithBoardByKey.resultFunc( world, sds );
            expect(result.board).toBeDefined();
            expect(result.uniqueStructures).toBeDefined();
        })

        it ("gets the unique structure definitions in the world", () => {
            const world = {
                ...worldTypes.emptyWorld,
                nullStructureId: "a",
                createdAt: 1,
                width: 3,
                length: 3,
                structures: [{
                    ...worldTypes.emptyStructure,
                    definition: { ...structureDefinitionTypes.emptyStructureDefintion, id: "b"}
                }]
            }

            const results = worldSelectors.getUniqueStructuresInWorld( world, sds[0] );
            expect(results).toHaveLength(2);

            const resultIds = results.map(r => r.id);
            expect(resultIds).toContain("a");
            expect(resultIds).toContain("b");
        })

        it ("gets the unique structure definitions in the world even if there none", () => {
            const world = {
                ...worldTypes.emptyWorld,
                nullStructureId: "a",
                createdAt: 1,
                width: 3,
                length: 3,
                structures: null
            }

            const results = worldSelectors.getUniqueStructuresInWorld( world, sds[0] );
            expect(results).toHaveLength(1);
            expect(results[0].id).toContain("a");
        })

        it ("populates the board with nullStructure and structures in the world", () => {
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

            const results = worldSelectors.getBoardFromWorld( world, sds[0] );
            expect(results).toHaveLength(3);

            expect(results[0][0].definition.id).toEqual("a");
            expect(results[0][1].definition.id).toEqual("a");
            expect(results[0][2].definition.id).toEqual("a");
            expect(results[1][0].definition.id).toEqual("a");
            expect(results[1][1].definition.id).toEqual("b"); //<-- Here's a structure
            expect(results[1][2].definition.id).toEqual("a");
            expect(results[2][0].definition.id).toEqual("a");
            expect(results[2][1].definition.id).toEqual("a");
            expect(results[2][2].definition.id).toEqual("a");
        });

        it ("populates the board with nullStructure if there are no structures in the world", () => {
            const world = {
                ...worldTypes.emptyWorld,
                nullStructureId: "a",
                createdAt: 1,
                width: 3,
                length: 3,
                structures: null
            }

            const results = worldSelectors.getBoardFromWorld( world, sds[0] );
            expect(results).toHaveLength(3);

            expect(results[0][0].definition.id).toEqual("a");
            expect(results[0][1].definition.id).toEqual("a");
            expect(results[0][2].definition.id).toEqual("a");
            expect(results[1][0].definition.id).toEqual("a");
            expect(results[1][1].definition.id).toEqual("a");
            expect(results[1][2].definition.id).toEqual("a");
            expect(results[2][0].definition.id).toEqual("a");
            expect(results[2][1].definition.id).toEqual("a");
            expect(results[2][2].definition.id).toEqual("a");
        })


    })

})
