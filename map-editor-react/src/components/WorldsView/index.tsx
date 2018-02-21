import * as React from 'react';
import { connect } from "react-redux";
import { Route, Switch, RouteComponentProps } from 'react-router-dom';

import { StateTree } from 'services/types';
import { worldActions, worldSelectors } from 'services/worlds';
import { structureDefinitionsActions, structureDefinitionsSelectors } from 'services/structureDefinitions';

import LoadingIndicator from 'components/common/LoadingIndicator';
import WorldsList from './WorldsList';
import MapEditor from './MapEditor';

interface MapProps {
    isFetching: boolean,
    hasFetched: boolean,
    error: any
};
const mapStateToProps = (state: StateTree) => ({
    isFetching: worldSelectors.isFetching(state) && structureDefinitionsSelectors.isFetching(state),
    hasFetched: worldSelectors.getHasFetched(state) && structureDefinitionsSelectors.getHasFetched(state),
    error: worldSelectors.getError(state) && structureDefinitionsSelectors.getError(state)
});

interface DispatchProps {
    fetchWorlds: any
}
const mapDispatchToProps = (dispatch: any) => ({
    fetchWorlds: () => {
        dispatch(worldActions.fetchWorlds())
        dispatch(structureDefinitionsActions.fetchStructureDefinitions())
    }
})

interface OwnProps extends RouteComponentProps<any>, React.Props<any> {};

type WorldsViewProps = MapProps & DispatchProps & OwnProps;

class WorldsView extends React.Component<WorldsViewProps, any> {
    componentDidMount () {
        const { fetchWorlds } = this.props;
        fetchWorlds();
    }

    render() {
        const { hasFetched, match } = this.props;
        return hasFetched
        ? ( <Switch>
                <Route path={match.url + '/:id'} component={MapEditor} />
                <Route component={WorldsList} />
             </Switch> )
        : <LoadingIndicator />

    }
}


export default connect<MapProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(WorldsView);
