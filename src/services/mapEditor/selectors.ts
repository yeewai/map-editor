import { createSelector } from 'reselect';
import _ from 'lodash';
import { StateTree } from 'services/types';
import { structureDefinitionsSelectors, structureDefinitionTypes as sdTypes } from 'services/structureDefinitions';
import { worldTypes } from 'services/worlds';

// -------------------------------------------------------------
// Camera Controls
// -------------------------------------------------------------
export const getZoom = ( state: StateTree ) => state.mapEditor.zoom;
export const getPan = (state: StateTree ) => ({ h: state.mapEditor.panH, v: state.mapEditor.panV });

export const getBuildStructureDefinition = ( state:StateTree ) => state.mapEditor.buildStructureDefinition;
export const getMousePosition = ( state:StateTree ) => state.mapEditor.mousePosition;

// -------------------------------------------------------------
// Map Editor Active World
// -------------------------------------------------------------
export const getActiveWorld = ( state: StateTree ) => state.mapEditor.activeWorld;

export const getActiveWorldWithDefinition = createSelector(
    getActiveWorld, structureDefinitionsSelectors.get,
    ( world: worldTypes.World, sdefinitions: sdTypes.StructureDefinition[] ) => {
        if (!world) { return null; }
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

export const getBoardFromWorld = ( world: worldTypes.World ): worldTypes.Structure[][] => {
    //Mutable, but I think it's more efficient tbh...
    let board: worldTypes.Structure[][] = _.range(world.width).map( (x, i) => (_.range(world.length).map( (y, j) => (null))));

    if (world.structures) {
        world.structures.forEach( s => {
            board[s.xposition][s.yposition] = s
        })
    }

    return board;
}

export const getUniqueStructuresInWorld = ( world: worldTypes.World): sdTypes.StructureDefinition[] => {
    return (
        world.structures
        ? Array.from(new Set(world.structures.map( s => s.definition )))
        : []
    );
}

export const getActiveWorldWithBoard = createSelector(
    getActiveWorldWithDefinition, structureDefinitionsSelectors.get,
    ( world: worldTypes.World, sdefinitions: sdTypes.StructureDefinition[] ): worldTypes.WorldWithBoard => {
        if (!world) { return null; }

        return {
            ...world,
            board: getBoardFromWorld(world),
            uniqueStructures: getUniqueStructuresInWorld(world)
        }
    }
)
