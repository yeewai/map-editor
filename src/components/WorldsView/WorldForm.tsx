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
import { structureDefinitionsSelectors, structureDefinitionTypes } from 'services/structureDefinitions';

export interface StateProps {
    handleSubmit: ( event: any ) => any, //This is passed in from redux-form
    handleFormSubmit: ( values: any ) => any,
    form: string,
    initialValues: worldTypes.World,
    formErrors: any, //I'm not sure how I want to do the object yet...
    formfields: any, //I'm not sure how I want to do the object yet...
    isValid: boolean,
    structureDefinitions: _.Dictionary<structureDefinitionTypes.StructureDefinition[]>
}

export const WorldForm: React.SFC<StateProps> = ({ handleFormSubmit, handleSubmit, isValid, formErrors, formfields, structureDefinitions }) => {

    if (!structureDefinitions || !structureDefinitions[GROUND_TYPE]) { return <Alert color="danger"><h4 className="alert-heading">There are no structures of type {GROUND_TYPE}!</h4> Please create one before creating a world. </Alert>}

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
        }
    ]

    return (
        <div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>

                {fields.map( f => renderField(f.name, f.prettyName, f.validations, f.width, f.component, f.inputType, labelWidth, formErrors[f.name], formfields[f.name])) }
                <FormGroup row>
                    <legend> Tile to initialize the map with </legend>
                    <FormGroup row check>
                        {
                            <ul>
                                { structureDefinitions[GROUND_TYPE].map( ( sd: structureDefinitionTypes.StructureDefinition, i:number ) => (
                                    <li className="card-li" key={sd.id} >
                                        <Label check>
                                            <Card>
                                                <CardImg top width="100%" src={sd.imageUrl} alt={sd.name} />
                                                <CardBody>
                                                    <CardTitle>{sd.name}</CardTitle>
                                                    <CardSubtitle>{sd.width} x {sd.length}</CardSubtitle>
                                                    <Field name="nullStructureId" component="input" type="radio" value={sd.id}/>
                                                </CardBody>
                                            </Card>
                                        </Label>
                                    </li>
                                )) }
                            </ul>
                        }
                    </FormGroup>
                </FormGroup>

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

    const structureDefinitions= structureDefinitionsSelectors.getByGroup(state);
    const nullStructureId = structureDefinitions[GROUND_TYPE] && structureDefinitions[GROUND_TYPE][0] && structureDefinitions[GROUND_TYPE][0].id;

    return {
        form: ownProps.formName,
        initialValues: { ...ownProps.sd, nullStructureId  },
        formErrors,
        isValid,
        formfields,
        structureDefinitions
    }
}

export const FORM = reduxForm({ })(WorldForm);
export default connect(mapStateToProps)(FORM);
