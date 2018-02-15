import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Creatable from 'react-select';
import ReactQuill from 'react-quill';
import classnames from 'classnames';
import { FormGroup, Label, Col, Button } from 'reactstrap';

import * as FormValidations from 'helpers/formValidations';
import { renderField } from 'helpers/formHelpers';
import { structureDefinitionsSelectors, structureDefinitionTypes } from 'services/structureDefinitions';

export interface StateProps {
    handleSubmit: ( event: any ) => any, //This is passed in from redux-form
    handleFormSubmit: ( values: any ) => any,
    form: string,
    initialValues: structureDefinitionTypes.StructureDefinition,
    formErrors: any, //I'm not sure how I want to do the object yet...
    formfields: any, //I'm not sure how I want to do the object yet...
    isValid: boolean,
    kinds: string[]
}

export const createKindSelect = ( kinds ) => (
    ({ input }) => {
        const options = kinds.map( k => ({ value: k, label: k}));

        return (
            <Creatable
                options={options}
                scrollMenuIntoView={false}
                simpleValue={true}
                placeholder="Select or create new"
                onBlurResetsInput={false}
                onCloseResetsInput={false}
                { ...input }
            />
        );
    }
);

export const StructureDefinitionForm: React.SFC<StateProps> = ({ handleFormSubmit, handleSubmit, isValid, formErrors, formfields, kinds }) => {
    /*const quill = ({ input }) => (
        <ReactQuill value={input.value} onChange={input.onChange} bounds=".quill" />
    );*/

    const labelWidth = 2;

    const fieldDefaults = { width: 12 - labelWidth, component: "input", inputType: "text"  }
    const fields = [
        {
            ...fieldDefaults, name: "name", prettyName: "Name",
            validations: [FormValidations.required]
        }, {
            ...fieldDefaults, name: "imageUrl", prettyName: "Image URL",
            validations: [FormValidations.required, FormValidations.validUrl]
        }, {
            ...fieldDefaults, name: "width", prettyName: "Width",
            validations: [FormValidations.required], width: labelWidth, inputType: "number"
        },{
            ...fieldDefaults, name: "length", prettyName: "Length",
            validations: [FormValidations.required], width: labelWidth, inputType: "number"
        }, {
            ...fieldDefaults, name: "kind", prettyName: "Type",
            validations: [FormValidations.required], component: createKindSelect(kinds)
        }
    ]

    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                { fields.map( f => renderField(f.name, f.prettyName, f.validations, f.width, f.component, f.inputType, labelWidth, formErrors[f.name], formfields[f.name])) }
                <FormGroup row>
                    <Col sm={{ size: labelWidth, offset: labelWidth }}>
                        <button disabled={!isValid} className={classnames("btn btn-primary", { disabled: !isValid})} type="submit">Submit</button>
                    </Col>
                    <Col sm={12 - (labelWidth * 2) }>
                        {!isValid ? <span className="validation-error form-error">There are incomplete fields</span> : null}
                    </Col>
                </FormGroup>
            </form>
        </div>
    );
}

export const mapStateToProps = ( state, ownProps ) => {
    const form = state.form[ownProps.formName];
    const formErrors = form && form.syncErrors || {} ;
    const isValid = form && form.syncErrors === undefined;
    const formfields = form && form.fields || {};

    const formKind = form && form.values && form.values.kind || undefined;
    const kinds = structureDefinitionsSelectors.getKinds(state);
    const combinedKinds = kinds.indexOf(formKind) >= 0 ? kinds : [...kinds, formKind ]

    return {
        form: ownProps.formName,
        initialValues: ownProps.sd,
        // error: structureDefinitionsSelectors.getError(state),
        formErrors,
        isValid,
        formfields,
        kinds: combinedKinds
    }
}

export const FORM = reduxForm({ })(StructureDefinitionForm);
export default connect(mapStateToProps)(FORM);
