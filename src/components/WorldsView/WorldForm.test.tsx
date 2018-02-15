import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';
import sinon from 'sinon';

import { WorldForm, mapStateToProps, createKindSelect} from './WorldForm';
import { worldTypes } from 'services/worlds';
import { structureDefinitionTypes } from 'services/structureDefinitions';
import { GROUND_TYPE } from 'conf';

Enzyme.configure({ adapter: new Adapter() });

describe("Structure Definition Form", () => {
    const world1: worldTypes.World = {
        "id": "id1",
        "name": "name1",
        "key": "key1",
        "description": "string",
        "width": 1,
        "length": 2,
        "createdAt": 1,
        "isPublished": true,
        "structures": [],
        "nullStructureId": "a"
    };

    it("matches snapshot", () => {
        const wrapper = shallow( <WorldForm
            form="a"
            initialValues={world1}
            handleFormSubmit={sinon.spy()}
            handleSubmit={sinon.spy()}
            isValid={false}
            formErrors={{}}
            formfields={{}}
            structureDefinitions={{[GROUND_TYPE]: [structureDefinitionTypes.emptyStructureDefintion]}}
            />);

        expect(wrapper).toMatchSnapshot();
    });

    it ("Errors if there are no structure definitions of Ground type", () => {
        const wrapper = shallow( <WorldForm
            form="a"
            initialValues={world1}
            handleFormSubmit={sinon.spy()}
            handleSubmit={sinon.spy()}
            isValid={false}
            formErrors={{}}
            formfields={{}}
            structureDefinitions={{}}
            />);

        expect(wrapper.find("Alert").exists()).toBe(true);
    })

    it ("maps state to props", () => {
        const state = {
            form: {
                a: {
                    syncErrors: undefined
                }
            },
            structureDefinitions: {
                items: [ {
                    id: "Sup",
                    kind: GROUND_TYPE
                }]
            }
        };
        const ownProps = {
            formName: "a",
            sd: {}
        };

        const mappedState = mapStateToProps(state, ownProps);

        expect(mappedState.formfields).toEqual({})
        expect(mappedState.formErrors).toEqual({})

    })

})
