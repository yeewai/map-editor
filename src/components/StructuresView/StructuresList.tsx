import * as React from 'react';
import { connect } from "react-redux";

import { StateTree } from 'services/types';

import { structureDefinitionsSelectors, structureDefinitionTypes } from 'services/structureDefinitions';

export interface StateProps {
    structureDefinitions: structureDefinitionTypes.StructureDefinition[]
}

export const StructuresList: React.SFC<StateProps> = ( props ) => {
    const { structureDefinitions } = props;

    return (
        <ul>
            { structureDefinitions.map( ( sd ) => (
                 <li className="card" key={sd.id} > {sd.name}</li> 
            )) }
        </ul>
    );

}

const mapStateToProps = (state: StateTree) => ({
    structureDefinitions: structureDefinitionsSelectors.get(state)
});


export default connect<StateProps, any, any>(mapStateToProps)(StructuresList);
