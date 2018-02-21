import { createSelector } from 'reselect';
// import _ from 'lodash';

import { StateTree } from 'services/types';
import { World, WorldWithBoard, Structure} from './types';

export const get = ( state: StateTree )  => state.worlds.items;
export const getError = (state: StateTree ) => state.worlds.error;
export const isFetching = (state: StateTree ) => state.worlds.isFetching;
export const getHasFetched = (state: StateTree ) => state.worlds.hasFetched;
export const getByKey = ( state: StateTree, key: string ) => get(state).filter( (w: World) => w.key === key).sort( (a,b) => (b.createdAt - a.createdAt))[0];

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
