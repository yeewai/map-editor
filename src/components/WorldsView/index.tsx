import * as React from 'react';
import { connect } from "react-redux";

import { StateTree } from 'services/types';
import { worldActions, worldSelectors } from 'services/worlds';

import LoadingIndicator from 'components/common/LoadingIndicator';
import WorldsList from './WorldsList';

interface StateProps {
    isFetching: boolean,
    hasFetched: boolean,
    error: any
};
const mapStateToProps = (state: StateTree) => ({
    isFetching: worldSelectors.isCurrentProfileFetching(state),
    hasFetched: worldSelectors.getHasFetched(state),
    error: worldSelectors.getError(state)
});

interface DispatchProps {
    fetchWorlds: any
}
const mapDispatchToProps = (dispatch: any) => ({
    fetchWorlds: () => { dispatch(worldActions.fetchWorlds()) }
})

type WorldsViewProps = StateProps & DispatchProps;

class WorldsView extends React.Component<WorldsViewProps, any> {
    componentDidMount () {
        const { fetchWorlds } = this.props;
        fetchWorlds();
    }

    render() {
        return this.props.hasFetched ? <WorldsList /> : <LoadingIndicator />;
    }
}


export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(WorldsView);
