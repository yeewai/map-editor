/*import { createSelector } from 'reselect';*/

import { StateTree } from 'services/types';

export const get = ( state: StateTree ) => state.structureDefinitions.items;
export const getError = (state: StateTree ) => state.structureDefinitions.error;
export const isCurrentProfileFetching = (state: StateTree ) => state.structureDefinitions.isFetching;
export const getHasFetched = (state: StateTree ) => state.structureDefinitions.hasFetched;