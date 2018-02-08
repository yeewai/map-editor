import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter} from 'react-router-dom';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import { getMockRouterProps } from 'helpers/test/react-router';
import WorldsView from './index';
import WorldsList from './WorldsList';
import { worldActions } from 'services/worlds';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe("Worlds View Index (World Library)", () => {
    let state, sandbox, store, wrapper, routerProps;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        state = {
            worlds: {
                isFetching: false,
                hasFetched: false,
                error: undefined
            }
        };
        routerProps = getMockRouterProps<any>(null);
    });

    afterEach(() => {
        sandbox.restore();
    });

    const mountWorldView = (store, routerProps) => (
        mount(<Provider store={store}>
            <MemoryRouter>
                <WorldsView
                    history={routerProps.history}
                    location={routerProps.location}
                    match={routerProps.match}
                />
            </MemoryRouter>
        </Provider>)
    )

    it ("renders loading screen when first started", () => {
		store = mockStore(state);
		wrapper = mountWorldView(store, routerProps);
		expect(wrapper.find("LoadingIndicator").exists()).toBe(true);
	});

    it("dispatches the fetch world definitions on mount", () => {
        const fetchActionSpy = sandbox.spy(worldActions, 'fetchWorlds');
        store = mockStore(state);
		wrapper = mountWorldView(store, routerProps);
        expect(fetchActionSpy.called).toBe(true);
    });

    it ("renders worlds list after fetching", () => {
        state.worlds.hasFetched = true;
		store = mockStore(state);
		wrapper = mountWorldView(store, routerProps);
		expect(wrapper.find(WorldsList).exists()).toBe(true);
	});
});
