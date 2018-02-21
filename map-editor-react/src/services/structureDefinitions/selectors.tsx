import { createSelector } from 'reselect';
import _ from 'lodash';

import { StateTree } from 'services/types';


export const get = ( state: StateTree ) => state.structureDefinitions.items;
export const getError = (state: StateTree ) => state.structureDefinitions.error;
export const isFetching = (state: StateTree ) => state.structureDefinitions.isFetching;
export const getHasFetched = (state: StateTree ) => state.structureDefinitions.hasFetched && state.structureDefinitions.itemsRequested <= state.structureDefinitions.items.length; //TODO: This will break if errors.

export const getByGroup = createSelector(
    get,
    ( sdefinitions ) => ( _.groupBy(sdefinitions, "kind") )
);

export const getKinds = createSelector(
    get,
    ( sdefinitions ) => ( Array.from(new Set(sdefinitions.map( sd => sd.kind ))) )
)
