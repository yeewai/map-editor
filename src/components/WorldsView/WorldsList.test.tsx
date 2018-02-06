import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';
/*import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';*/
/*import sinon from 'sinon';*/

import { WorldsList, mapStateToProps, StateProps } from './WorldsList';
import { StateTree, defaultStateTree } from 'services/types';

import { worldTypes } from 'services/worlds';

Enzyme.configure({ adapter: new Adapter() });

describe("Worlds List", () => {
    const world1: worldTypes.World = {
        "id": "id1",
        "name": "name1",
        "key": "key1",
        "description": "string",
        "width": 1,
        "length": 2,
        "createdAt": 1,
        "isPublished": true
    };
    const world2: worldTypes.World = {
        "id": "id2",
        "name": "name2",
        "key": "key2",
        "description": "string",
        "width": 2,
        "length": 5,
        "createdAt": 2,
        "isPublished": true
    };
    const world3: worldTypes.World = {
        "id": "id3",
        "name": "name3",
        "key": "key2",
        "description": undefined,
        "width": 3,
        "length": 4,
        "createdAt": 3,
        "isPublished": false
    };
    const world4: worldTypes.World = {
        "id": "id4",
        "name": "name4",
        "key": "key2",
        "description": undefined,
        "width": 3,
        "length": 4,
        "createdAt": 1,
        "isPublished": false
    };

    it( "matches snapshot", () => {
        const wrapper = shallow(<WorldsList worlds={[world1, world3]}/>);
        expect(wrapper).toMatchSnapshot();
    })

    it( "maps state to props", () => {
        const state: StateTree = $.extend(true, {}, defaultStateTree);
        state.worlds.items = [world1, world2, world3, world4];

        expect(mapStateToProps(state)).toEqual({worlds: [world1, world3]});
    })
})
