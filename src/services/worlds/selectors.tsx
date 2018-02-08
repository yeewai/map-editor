import { createSelector } from 'reselect';
import _ from 'lodash';

import { StateTree } from 'services/types';
import { World } from './types';

import { structureDefinitionsSelectors, structureDefinitionTypes } from 'services/structureDefinitions';


export const get = ( state: StateTree )  => state.worlds.items;
export const getError = (state: StateTree ) => state.worlds.error;
export const isFetching = (state: StateTree ) => state.worlds.isFetching;
export const getHasFetched = (state: StateTree ) => state.worlds.hasFetched;

export const getWithDefintiions = createSelector(
    get, structureDefinitionsSelectors.get,
    ( worlds: World[], sdefinitions: structureDefinitionTypes.StructureDefinition[] ) => (
        worlds.map( w => ({ ...w,
            structures: w.structures.map( s => ({
                ...s,
                withDefinition: true,
                definition: sdefinitions.find( sd => sd.id === s.definitionId)
            }))
        }))
    )
)

export const getUniqueWorlds = createSelector(
    getWithDefintiions,
    ( worlds: World[] ) => (
        worlds
        ? worlds.reduce((acc: World[], world: World) => {
            const matchingWorld = acc.find( (w: World) => w.key === world.key)
            return matchingWorld && matchingWorld.createdAt > world.createdAt ? acc : [...acc, world].filter(w => w !== matchingWorld);
        }, [] )
        : []
    )
)

export const getWorldById = (state: StateTree, id: string): World | undefined =>
    (getWithDefintiions(state).find( (w: World) => w.id === id));
