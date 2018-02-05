import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import $ from 'jquery';
import sinon from 'sinon';

import { StructureDefinitionForm, mapStateToProps, createKindSelect} from './StructureDefinitionForm';
import { structureDefinitionTypes } from 'services/structureDefinitions';

Enzyme.configure({ adapter: new Adapter() });

describe("Structure Definition Form", () => {
    const sd1: structureDefinitionTypes.StructureDefinition = {
        "id": "id1",
        "name": "name1",
        "description": "string",
        "width": 1,
        "length": 2,
        "kind": "someKind",
        "imageUrl": "string"
    };

    it("matches snapshot", () => {
        const wrapper = shallow( <StructureDefinitionForm
            form="a"
            initialValues={sd1}
            handleFormSubmit={sinon.spy()}
            handleSubmit={sinon.spy()}
            isValid={true}
            formErrors={{}}
            formfields={{}}
            kinds={["a", "b"]} />);

        expect(wrapper).toMatchSnapshot();
    });

    it ("prints form errors if touched", () => {
        const errorStr = "Name is Required";

        const wrapper = shallow( <StructureDefinitionForm
            form="a"
            initialValues={sd1}
            handleFormSubmit={sinon.spy()}
            handleSubmit={sinon.spy()}
            isValid={false}
            formErrors={{name: errorStr}}
            formfields={{name: {touched: true}}}
            kinds={["a", "b"]} />);

        expect(wrapper.find(".field-error").text()).toEqual(errorStr);
        expect(wrapper.find(".form-error").exists()).toBe(true);
    })

    it ("creates a kind select for Reselect", () => {
        const ks = createKindSelect(["a", "b"]);
        const arg = {input: {value: ""}};

        const wrapper = shallow(ks(arg));
        expect(wrapper.find('.Select').exists()).toBe(true);
    })


    it ("maps state to props", () => {
        const state = {
            form: {
                a: {
                    syncErrors: undefined
                }
            },
            structureDefinitions: {
                items: [ {kind: "b"}, {kind: "c"}, {kind: "d"}, {kind: "c"}]
            }
        };
        const ownProps = {
            formName: "a",
            sd: {}
        };

        const mappedState = mapStateToProps(state, ownProps);

        expect(mappedState.formfields).toEqual({})
        expect(mappedState.formErrors).toEqual({})
        expect(mappedState.kinds).toEqual(["b", "c", "d", undefined])
    })

    it ("maps state to props and appends new form kind to kinds", () => {
        const state = {
            form: {
                a: {
                    syncErrors: undefined,
                    values: {
                        kind: "z"
                    }
                }
            },
            structureDefinitions: {
                items: [ {kind: "b"}, {kind: "c"}, {kind: "d"}, {kind: "c"}]
            }
        };
        const ownProps = {
            formName: "a",
            sd: {}
        };

        const mappedState = mapStateToProps(state, ownProps);

        expect(mappedState.kinds).toEqual(["b", "c", "d", "z"])
    })

    it ("maps state to props and does append prexisting form kind to kinds", () => {
        const state = {
            form: {
                a: {
                    syncErrors: undefined,
                    values: {
                        kind: "d"
                    }
                }
            },
            structureDefinitions: {
                items: [ {kind: "b"}, {kind: "c"}, {kind: "d"}, {kind: "c"}]
            }
        };
        const ownProps = {
            formName: "a",
            sd: {}
        };

        const mappedState = mapStateToProps(state, ownProps);

        expect(mappedState.kinds).toEqual(["b", "c", "d"])
    })
})
