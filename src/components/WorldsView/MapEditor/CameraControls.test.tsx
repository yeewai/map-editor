import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { CameraControls, mapDispatchToProps } from './CameraControls';
import { mapEditorActions } from 'services/mapEditor';

Enzyme.configure({ adapter: new Adapter() });

describe("Camera Controls for Map", () => {
    let state, sandbox, store, wrapper, dispatchSpy;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        state = {};
        dispatchSpy = sandbox.spy();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it ("renders camera controls", () => {
		wrapper = shallow(<CameraControls
            zoomIn={sinon.spy()} zoomOut={sinon.spy()} zoomReset={sinon.spy()}
            panUp={sinon.spy()} panDown={sinon.spy()} panLeft={sinon.spy()} panRight={sinon.spy()} panReset={sinon.spy()}
        />)
		expect(wrapper).toMatchSnapshot();
	});

    it ("handles all the camera zoom and pan actions", () => {
        const actions = ["zoomIn", "zoomOut", "zoomReset", "panUp", "panDown", "panLeft", "panRight", "panReset"];

        actions.forEach( a => {

            const spy = sandbox.stub(mapEditorActions, a);

            mapDispatchToProps(dispatchSpy)[a]();
            expect(spy.called).toBe(true);

            sandbox.restore();
        })

    })

});
