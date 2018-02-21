import { structureDefinitionTypes } from 'services/structureDefinitions';
import { worldTypes } from 'services/worlds';

export interface State {
    zoom: number,
    panV: number,
    panH: number,
    buildStructureDefinition?: structureDefinitionTypes.StructureDefinition
    mousePosition?: { x: number, y: number },
    activeWorld?: worldTypes.World
}
