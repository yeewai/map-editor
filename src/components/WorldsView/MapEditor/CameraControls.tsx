import * as React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import _ from 'lodash';

import { Button } from 'reactstrap';

import { mapEditorActions } from 'services/mapEditor';

export type DispatchProps  = {
    zoomIn: () => void,
    zoomOut: () => void,
    zoomReset: () => void,
    panUp: () => void,
    panDown: () => void,
    panLeft: () => void,
    panRight: () => void,
    panReset: () => void
}

export const mapDispatchToProps = (dispatch: any) => ({
    zoomIn: () => { dispatch(mapEditorActions.zoomIn()) },
    zoomOut: () => { dispatch(mapEditorActions.zoomOut()) },
    zoomReset: () => { dispatch(mapEditorActions.zoomReset()) },
    panUp: () => { dispatch(mapEditorActions.panUp()) },
    panDown: () => { dispatch(mapEditorActions.panDown()) },
    panLeft: () => { dispatch(mapEditorActions.panLeft()) },
    panRight: () => { dispatch(mapEditorActions.panRight()) },
    panReset: () => { dispatch(mapEditorActions.panReset()) }
})


export const CameraControls: React.SFC<DispatchProps> = (  {
    zoomIn, zoomOut, zoomReset,
    panUp, panDown, panLeft, panRight, panReset
} ) => {

    return (
        <aside>
            <h3>Camera Controls</h3>
            <Button onClick={zoomIn} >Zoom In </Button>
            <Button onClick={zoomOut} >Zoom Out </Button>
            <Button onClick={zoomReset} >Reset Zoom</Button>
            <Button color="info" onClick={panUp}>Pan Up</Button>
            <Button color="info" onClick={panDown}>Pan Down</Button>
            <Button color="info" onClick={panLeft}>Pan Left</Button>
            <Button color="info" onClick={panRight}>Pan Right</Button>
            <Button color="info" onClick={panReset}>Pan Reset</Button>
        </aside>
    )

};

export default connect<any, DispatchProps, any>(null, mapDispatchToProps)(CameraControls);
