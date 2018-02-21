import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import { getMockRouterProps } from 'helpers/test/react-router';
import { DrawAddStructureDefinitionTile, mapStateToProps } from './DrawAddStructureDefinitionTile';
// import { worldTypes } from 'services/worlds';
import { defaultStateTree } from 'services/types';
import { mapEditorSelectors, mapEditorActions } from 'services/mapEditor';

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
        wrapper = shallow(<DrawAddStructureDefinitionTile uniqueStructures={["a"]} buildStructureDefinition={"a"} mousePosition={"b"} />);
        expect(wrapper).toMatchSnapshot();
    });

    it ("renders the symbol if it does not exist in uniqueStructures", () => {
        wrapper = shallow(<DrawAddStructureDefinitionTile uniqueStructures={[]} buildStructureDefinition={{image: {innerHTML: <circle />}}} mousePosition={"b"} />);
        expect(wrapper).toMatchSnapshot();
    });

    it ("does not render if there is no buildStructureDefinition or mousePosition", () => {
        wrapper = shallow(<DrawAddStructureDefinitionTile uniqueStructures={[]} buildStructureDefinition={null} mousePosition={"b"} />);
        expect(wrapper.get(0)).toBeNull();

        wrapper = shallow(<DrawAddStructureDefinitionTile uniqueStructures={[]} buildStructureDefinition={"a"} mousePosition={null} />);
        expect(wrapper.get(0)).toBeNull();
    })

    it ("maps state to props", () => {
        sandbox.stub(mapEditorSelectors, 'getBuildStructureDefinition').returns("a")
        sandbox.stub(mapEditorSelectors, 'getMousePosition').returns("b")

        expect(mapStateToProps(defaultStateTree)).toMatchObject({buildStructureDefinition: "a", mousePosition: "b"});
    })

});
