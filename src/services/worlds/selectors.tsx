import { createSelector } from 'reselect';
import _ from 'lodash';

import { StateTree } from 'services/types';
import { World } from './types';


export const get = ( state: StateTree )  => state.worlds.items;
export const getError = (state: StateTree ) => state.worlds.error;
export const isCurrentProfileFetching = (state: StateTree ) => state.worlds.isFetching;
export const getHasFetched = (state: StateTree ) => state.worlds.hasFetched;


export const getUniqueWorlds = createSelector(
    get,
    ( worlds: World[] ) => ( worlds
        ? worlds.reduce((acc: World[], world: World) => {
            const matchingWorld = acc.find( (w: World) => w.key === world.key)
            return matchingWorld && matchingWorld.createdAt > world.createdAt ? acc : [...acc, world].filter(w => w !== matchingWorld);
        }, [] )
        : []
    )
)
