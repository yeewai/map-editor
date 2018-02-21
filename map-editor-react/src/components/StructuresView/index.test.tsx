import React from 'react';
import { Provider } from 'react-redux';
/*import { MemoryRouter, Redirect } from 'react-router-dom';*/
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';

import StructuresView from './index';
import StructuresList from './StructuresList';
import { structureDefinitionsActions } from 'services/structureDefinitions';

Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe("Structures View Index (Structure Library)", () => {
    let state, sandbox, store, wrapper;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        state = {
            structureDefinitions: {
                isFetching: false,
                hasFetched: false,
                error: undefined,
                items: [],
                itemsRequested: 0
            }
        };
    });

    afterEach(() => {
        sandbox.restore();
    });

    it ("renders loading screen when first started", () => {
		store = mockStore(state);
		wrapper = mount(<Provider store={store}><StructuresView/></Provider>);
		expect(wrapper.find("LoadingIndicator").exists()).toBe(true);
	});

    it("dispatches the fetch structure definitions on mount", () => {
        const fetchActionSpy = sandbox.spy(structureDefinitionsActions, 'fetchStructureDefinitions');
        store = mockStore(state);
        wrapper = mount(<Provider store={store}><StructuresView/></Provider>);
        expect(fetchActionSpy.called).toBe(true);
    });

    it ("renders structures list after fetching", () => {
        state.structureDefinitions.hasFetched = true;
		store = mockStore(state);
		wrapper = mount(<Provider store={store}><StructuresView/></Provider>);
		expect(wrapper.find(StructuresList).exists()).toBe(true);
	});
});
