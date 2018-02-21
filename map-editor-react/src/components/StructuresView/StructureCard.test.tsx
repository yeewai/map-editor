import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { getMockRouterProps } from 'helpers/test/react-router';
import { StructureCard } from './StructureCard';

Enzyme.configure({ adapter: new Adapter() });

describe("Map Editor", () => {
    let sandbox, wrapper, routerProps, world;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it ("renders", () => {
        wrapper = shallow(<StructureCard structureDefinition={{name: "a", width: 1, length: 2, description: "<p>Sup</p>"}} isActive={true} setBuildStructureDefinition={sandbox.spy()} />);
        expect(wrapper).toMatchSnapshot();
    });

});
