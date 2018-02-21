import * as React from 'react';
import { connect } from "react-redux";
import { Alert } from 'reactstrap';
// import moment from 'moment';

import { OpenModalButton } from '@evercourse/ever-modal';

import { StateTree } from 'services/types';
import { worldSelectors, worldTypes, worldActions } from 'services/worlds';
import { mapEditorActions, mapEditorSelectors } from 'services/mapEditor';

import DrawMap from './DrawMap';
import CameraControls from './CameraControls';
import StructuresList from 'components/StructuresView/StructuresList';
import StructureCard from './StructureCard';

export type StateProps  = {
    activateWorld: worldTypes.World,
    world: worldTypes.WorldWithBoard | undefined
}
export const mapStateToProps = (state: StateTree, ownProps): StateProps => ({
    activateWorld: worldSelectors.getByKey(state, ownProps.match.params.id),
    world: mapEditorSelectors.getActiveWorldWithBoard(state)
});

interface DispatchProps {
    setActiveWorld: ( world: worldTypes.World ) => void
}
export const mapDispatchToProps = (dispatch: any) => ({
    setActiveWorld: ( world ) => { dispatch(mapEditorActions.setActiveWorld(world)) }
})

export type Props = DispatchProps & StateProps;

export class MapEditor extends React.Component<Props, any> {
    componentWillMount () {
        const { setActiveWorld, activateWorld } = this.props;
        setActiveWorld(activateWorld);
    }

    render() {
        const { world } = this.props;
        if (!world) {
            return (
                <Alert color="danger">
                    <h2>Error!</h2>
                    <p>That world does not exist!</p>
                </Alert>
            );
        }

        return (
            <article className="map-editor">
                <h2>{world.name}</h2>
                <CameraControls />
                <DrawMap world={world}/>
                <StructuresList LiComponent={ StructureCard } />
            </article>
        )
    }

};

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(MapEditor);
