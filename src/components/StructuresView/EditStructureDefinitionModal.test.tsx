import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';
import sinon from 'sinon';

import { structureDefinitionsActions, structureDefinitionTypes } from 'services/structureDefinitions';

import { ModalContent, mapDispatchToProps } from './EditStructureDefinitionModal';

Enzyme.configure({ adapter: new Adapter() });

describe( "Edit StructureDefinition Modal", () => {
    const sd1: structureDefinitionTypes.StructureDefinition = {
        "id": "id1",
        "name": "name1",
        "description": "string",
        "width": 1,
        "length": 2,
        "kind": "someKind",
        "imageUrl": "string"
    };

    it( "matches snapshot", () => {
        const wrapper = shallow( <ModalContent modalType="sup" handleFormSubmit={sinon.spy()} sd={sd1} />);
        expect(wrapper).toMatchSnapshot()
    })

    it ("has a submit handler", () => {
        const sandbox = sinon.createSandbox();

        const spy = sandbox.stub(structureDefinitionsActions, "updateStructureDefinition");

        const dispatchSpy = sinon.spy();
        mapDispatchToProps(dispatchSpy).handleFormSubmit( "" );
        expect(spy.called).toBe(true);

        sandbox.restore();
    })

})
