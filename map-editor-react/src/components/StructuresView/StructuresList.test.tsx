import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';
/*import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';*/
/*import sinon from 'sinon';*/

import { StructuresList, mapStateToProps, StateProps } from './StructuresList';
import { StateTree, defaultStateTree } from 'services/types';

import { structureDefinitionTypes } from 'services/structureDefinitions';

Enzyme.configure({ adapter: new Adapter() });

describe("Structures List", () => {
    const sd1: structureDefinitionTypes.StructureDefinition = {
        "id": "id1",
        "name": "name1",
        "description": "string",
        "width": 1,
        "length": 2,
        "kind": "someKind",
        "imageUrl": "string"
    };
    const sd2: structureDefinitionTypes.StructureDefinition = {
        "id": "id2",
        "name": "name2",
        "description": "string",
        "width": 2,
        "length": 5,
        "kind": "someKind",
        "imageUrl": "string"
    };
    const sd3: structureDefinitionTypes.StructureDefinition = {
        "id": "id3",
        "name": "name3",
        "description": undefined,
        "width": 3,
        "length": 4,
        "kind": "someOtherKind",
        "imageUrl": "string"
    };

    const sd = {
        someKind: [ sd1, sd2],
        someOtherKind: [ sd3 ]
    };

    it( "matches snapshot", () => {
        const component = () => (<div />);
        const wrapper = shallow(<StructuresList structureDefinitions={sd} LiComponent={component}/>);
        expect(wrapper).toMatchSnapshot();
    })

    it( "maps state to props", () => {
        const state: StateTree = $.extend(true, {}, defaultStateTree);
        state.structureDefinitions.items = [ sd1, sd2, sd3 ];

        expect(mapStateToProps(state)).toEqual({structureDefinitions: sd});
    })
})
