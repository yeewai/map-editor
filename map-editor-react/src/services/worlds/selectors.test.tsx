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
    

})
