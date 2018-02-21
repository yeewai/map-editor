import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Creatable from 'react-select';
import classnames from 'classnames';
import { Alert, FormGroup, Label, Col, Button, Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import _ from 'lodash';

import { GROUND_TYPE } from 'conf';
import * as FormValidations from 'helpers/formValidations';
import { renderField } from 'helpers/formHelpers';
import { worldSelectors, worldTypes } from 'services/worlds';

export interface StateProps {
    handleSubmit: ( event: any ) => any, //This is passed in from redux-form
    handleFormSubmit: ( values: any ) => any,
    form: string,
    initialValues: worldTypes.World,
    formErrors: any, //I'm not sure how I want to do the object yet...
    formfields: any, //I'm not sure how I want to do the object yet...
    isValid: boolean,
}

export const WorldForm: React.SFC<StateProps> = ({ handleFormSubmit, handleSubmit, isValid, formErrors, formfields }) => {
    const labelWidth = 2;

    const fieldDefaults = { width: 12 - labelWidth, component: "input", inputType: "text"  }
    const fields = [
        {
            ...fieldDefaults, name: "name", prettyName: "Name",
            validations: [FormValidations.required]
        }, {
            ...fieldDefaults, name: "key", prettyName: "Key",
            validations: [FormValidations.required]
        }, {
            ...fieldDefaults, name: "width", prettyName: "Width",
            validations: [FormValidations.required], width: labelWidth, inputType: "number"
        },{
            ...fieldDefaults, name: "length", prettyName: "Length",
            validations: [FormValidations.required], width: labelWidth, inputType: "number"
        }, {
            ...fieldDefaults, name: "bgImageUrl", prettyName: "Background Image URL",
            validations: [FormValidations.required, FormValidations.validUrl]
        }
    ]

    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                {fields.map( f => renderField(f.name, f.prettyName, f.validations, f.width, f.component, f.inputType, labelWidth, formErrors[f.name], formfields[f.name])) }

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

    return {
        form: ownProps.formName,
        initialValues: ownProps.sd,
        formErrors,
        isValid,
        formfields,
    }
}

export const FORM = reduxForm({ })(WorldForm);
export default connect(mapStateToProps)(FORM);
