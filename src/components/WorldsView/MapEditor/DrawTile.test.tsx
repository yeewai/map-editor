import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import DrawTile from './DrawTile';
import { worldTypes } from 'services/worlds';

Enzyme.configure({ adapter: new Adapter() });

describe("Drawing the board", () => {
    let sandbox, wrapper, structure;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        structure = worldTypes.emptyStructure;
    });

    afterEach(() => {
        sandbox.restore();
    });

    it ("renders", () => {
        structure.definition.imageWidth = 1;
        structure.definition.imageHeight = 2;

        wrapper = shallow(<DrawTile structure={structure} x={1} y={2} />);
        expect(wrapper).toMatchSnapshot();
    });

    it ("renders nothing if no structure", () => {
        wrapper = shallow(<DrawTile structure={null} x={1} y={2} />);
        expect(wrapper.get(0)).toBe(null);
    })

    it ("doesn't rerender if the structure hasn't changed (eg adjusting the camera)", () => {
        const wrapper = shallow(<DrawTile structure={structure} />)

        expect(wrapper.instance().shouldComponentUpdate({structure})).toBe(false)
        expect(wrapper.instance().shouldComponentUpdate({structure: [[1]]})).toBe(true)
    })

});
