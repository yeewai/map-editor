import * as React from 'react';
import { connect } from "react-redux";

import { StateTree } from 'services/types';
import { structureDefinitionTypes } from 'services/structureDefinitions';
import { mapEditorSelectors } from 'services/mapEditor';

import { DrawTile } from './DrawTile';

interface OwnProps {
    uniqueStructures: structureDefinitionTypes.StructureDefinition[]
}

interface StateProps {
    buildStructureDefinition?: structureDefinitionTypes.StructureDefinition,
    mousePosition?: { x: number, y: number }
}

export const mapStateToProps = (state: StateTree, ownProps: OwnProps): StateProps => ({
    buildStructureDefinition: mapEditorSelectors.getBuildStructureDefinition(state),
    mousePosition: mapEditorSelectors.getMousePosition(state)
});

export type PropTypes = OwnProps & StateProps;

export const DrawAddStructureDefinitionTile: React.SFC<PropTypes> = ( { uniqueStructures, buildStructureDefinition, mousePosition } ) => {
    if (!(buildStructureDefinition && mousePosition)) { return null; }
    const shouldDrawStructureDef = !!uniqueStructures.findIndex( sd => sd.id === buildStructureDefinition.id );

    return (
        <g className="AddStructure" pointerEvents="none">
            { shouldDrawStructureDef
                ? <defs className="buildingStructureReference">
                        <symbol id={buildStructureDefinition.id} key={buildStructureDefinition.id}
                            viewBox={`0 0 ${buildStructureDefinition.imageWidth} ${buildStructureDefinition.imageHeight}`}
                            dangerouslySetInnerHTML={{__html: buildStructureDefinition.image.innerHTML}}
                            preserveAspectRatio="xMinYMax"
                        />
                    </defs>
                : null
            }
            <DrawTile structureDefinition={buildStructureDefinition}
                    x={mousePosition.x} y={mousePosition.y} key={ `buildStructureDefinition`}/>

        </g>
    )
};

export default connect<StateProps, any, any>(mapStateToProps)(DrawAddStructureDefinitionTile);
