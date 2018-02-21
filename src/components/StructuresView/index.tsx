import * as React from 'react';
import { connect } from "react-redux";

import { StateTree } from 'services/types';
import { structureDefinitionsActions, structureDefinitionsSelectors } from 'services/structureDefinitions';

import LoadingIndicator from 'components/common/LoadingIndicator';
import StructuresList from './StructuresList';
import StructureCard from './StructureCard';

interface StateProps {
    isFetching: boolean,
    hasFetched: boolean,
    error: any
};

interface DispatchProps {
    fetchStructureDefinitions: any
}

interface OwnProps { LiComponent: React.SFC<any> }

type StructuresViewProps = StateProps & DispatchProps & OwnProps;

class StructuresView extends React.Component<StructuresViewProps, any> {
    componentDidMount () {
        const { fetchStructureDefinitions } = this.props;
        fetchStructureDefinitions();
    }

    render() {
        const { hasFetched, LiComponent } = this.props;
        return hasFetched ? <StructuresList LiComponent={ LiComponent || StructureCard } /> : <LoadingIndicator />;
    }
}

const mapStateToProps = (state: StateTree) => ({
    isFetching: structureDefinitionsSelectors.isFetching(state),
    hasFetched: structureDefinitionsSelectors.getHasFetched(state),
    error: structureDefinitionsSelectors.getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchStructureDefinitions: () => { dispatch(structureDefinitionsActions.fetchStructureDefinitions()) }
})

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(StructuresView);
