import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import DrawTile from './DrawTile';
import { structureDefinitionTypes } from 'services/structureDefinitions';

Enzyme.configure({ adapter: new Adapter() });

describe("Drawing the board", () => {
    let sandbox, wrapper, sd;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sd = structureDefinitionTypes.emptyStructureDefintion;
    });

    afterEach(() => {
        sandbox.restore();
    });

    it ("renders", () => {
        sd.imageWidth = 1;
        sd.imageHeight = 2;

        wrapper = shallow(<DrawTile structureDefinition={sd} x={1} y={2} />);
        expect(wrapper).toMatchSnapshot();
    });

    it ("renders the null tile if no structure", () => {
        wrapper = shallow(<DrawTile structureDefinition={null} x={1} y={2} />);
        expect(wrapper).toMatchSnapshot();
    })

    it ("doesn't rerender if the structure hasn't changed (eg adjusting the camera)", () => {
        const wrapper = shallow(<DrawTile structureDefinition={sd} />)

        expect(wrapper.instance().shouldComponentUpdate({structureDefinition: sd})).toBe(false)
        expect(wrapper.instance().shouldComponentUpdate({structureDefinition: "WoooOOoOo"})).toBe(true)
    })

});
