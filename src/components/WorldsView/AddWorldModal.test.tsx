import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';
import sinon from 'sinon';

import { worldActions, worldTypes } from 'services/worlds';

import { ModalContent, mapDispatchToProps } from './AddWorldModal';

Enzyme.configure({ adapter: new Adapter() });

describe( "Add World Modal", () => {

    it( "matches snapshot", () => {
        const wrapper = shallow( <ModalContent modalType="sup" handleFormSubmit={sinon.spy()} />);
        expect(wrapper).toMatchSnapshot()
    })

    it ("has a submit handler", () => {
        const sandbox = sinon.createSandbox();

        const spy = sandbox.stub(worldActions, "addWorld");

        const dispatchSpy = sinon.spy();
        mapDispatchToProps(dispatchSpy).handleFormSubmit( "" );
        expect(spy.called).toBe(true);

        sandbox.restore();
    })

})
