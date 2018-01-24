import * as React from 'react';
import { connect } from "react-redux";

import { StateTree } from 'services/types';
import { structureDefinitionsActions, structureDefinitionsSelectors } from 'services/structureDefinitions';

import LoadingIndicator from 'components/common/LoadingIndicator';
import StructuresList from './StructuresList';

interface StateProps {
    isFetching: boolean,
    hasFetched: boolean,
    error: any
};

interface DispatchProps {
    fetchStructureDefinitions: any
}

type StructuresViewProps = StateProps & DispatchProps;

class StructuresView extends React.Component<StructuresViewProps, any> {
    componentDidMount () {
        const { fetchStructureDefinitions } = this.props;
        fetchStructureDefinitions();
    }

    render() {
        return this.props.hasFetched ? <StructuresList /> : <LoadingIndicator />;
    }
}

const mapStateToProps = (state: StateTree) => ({
    isFetching: structureDefinitionsSelectors.isCurrentProfileFetching(state),
    hasFetched: structureDefinitionsSelectors.getHasFetched(state),
    error: structureDefinitionsSelectors.getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchStructureDefinitions: () => { dispatch(structureDefinitionsActions.fetchStructureDefinitions()) }
})

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(StructuresView);
