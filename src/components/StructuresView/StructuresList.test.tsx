import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
/*import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';*/
/*import sinon from 'sinon';*/

import { StructuresList, mapStateToProps, StateProps } from './StructuresList';

Enzyme.configure({ adapter: new Adapter() });

describe("Structures List", () => {
    const sd1 = {
        "id": "id1",
        "name": "name1",
        "description": "string",
        "width": 1,
        "length": 2,
        "kind": "someKind",
        "imageUrl": "string"
    };
    const sd2 = {
        "id": "id2",
        "name": "name2",
        "description": "string",
        "width": 2,
        "length": 5,
        "kind": "someKind",
        "imageUrl": "string"
    };
    const sd3 = {
        "id": "id3",
        "name": "name3",
        "description": "string",
        "width": 3,
        "length": 4,
        "kind": "someOtherKind",
        "imageUrl": "string"
    };

    const sd: StateProps = {
        someKind: [ sd1, sd2],
        someOtherKind: [ sd3 ]
    };

    it( "matches snapshot", () => {
        const wrapper = shallow(<StructuresList structureDefinitions={sd}/>);
        expect(wrapper).toMatchSnapshot();
    })

    it( "maps state to props", () => {
        const state = {
            structureDefinitions: {
                items: [ sd1, sd2, sd3 ]
            }
        };

        expect(mapStateToProps(state)).toEqual({structureDefinitions: sd});
    })
})
