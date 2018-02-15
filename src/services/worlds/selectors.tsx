import { createSelector } from 'reselect';
import _ from 'lodash';

import { StateTree } from 'services/types';
import { World, WorldWithBoard, Structure} from './types';

import { structureDefinitionsSelectors, structureDefinitionTypes as sdTypes } from 'services/structureDefinitions';

export const get = ( state: StateTree )  => state.worlds.items;
export const getError = (state: StateTree ) => state.worlds.error;
export const isFetching = (state: StateTree ) => state.worlds.isFetching;
export const getHasFetched = (state: StateTree ) => state.worlds.hasFetched;
export const getByKey = ( state: StateTree, key: string ) => get(state).filter( (w: World) => w.key === key).sort( (a,b) => (b.createdAt - a.createdAt))[0];

export const getWorldWithDefinitionByKey = createSelector(
    getByKey, structureDefinitionsSelectors.get,
    ( world: World, sdefinitions: sdTypes.StructureDefinition[] ) => {
        const structures = world.structures && world.structures.map( s => ({
            ...s,
            withDefinition: true,
            definition: sdefinitions.find( sd => sd.id === s.definitionId)
        }))
        return {
            ...world,
            structures
        };
    }
)

export const getUniqueWorlds = createSelector(
    get,
    ( worlds: World[] ) => (
        worlds
        ? worlds.reduce((acc: World[], world: World) => {
            const matchingWorld = acc.find( (w: World) => w.key === world.key)
            return matchingWorld && matchingWorld.createdAt > world.createdAt ? acc : [...acc, world].filter(w => w !== matchingWorld);
        }, [] )
        : []
    )
)

export const getBoardFromWorld = ( world: World, nullStructure: sdTypes.StructureDefinition ): Structure[][] => {
    //Mutable, but I think it's more efficient tbh...
    let board: Structure[][] = _.range(world.width).map( (x, i) => (_.range(world.length).map( (y, j) => ({
        name: "ground",
        definitionId: world.nullStructureId,
        definition: nullStructure,
        xposition: i,
        yposition: j

    }))));

    if (world.structures) {
        world.structures.forEach( s => {
            board[s.xposition][s.yposition] = s
            //Make null the other tiles for larger sized structures
        })
    }

    return board;
}

export const getUniqueStructuresInWorld = ( world: World, nullStructure: sdTypes.StructureDefinition ): sdTypes.StructureDefinition[] => {
    return ((
        world.structures
        ? Array.from(new Set(world.structures.map( s => s.definition )))
        : []
    ).concat(nullStructure));
}

export const getWorldWithBoardByKey = createSelector(
    getWorldWithDefinitionByKey, structureDefinitionsSelectors.get,
    ( world: World, sdefinitions: sdTypes.StructureDefinition[] ): WorldWithBoard => {
        const nullStructure = sdefinitions.find( sd => sd.id === world.nullStructureId )

        return {
            ...world,
            board: getBoardFromWorld(world, nullStructure),
            uniqueStructures: getUniqueStructuresInWorld(world, nullStructure)
        }
    }
)
