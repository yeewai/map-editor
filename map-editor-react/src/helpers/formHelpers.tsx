import * as React from 'react';
import * as FormValidations from 'helpers/formValidations';
import { FormGroup, Label, Col } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

export const renderField = (
    fieldName: string,
    prettyFieldName: string,
    valdidations: FormValidations.validationFunc[],
    width: number,
    component: string | (({ input }: { input: any; }) => JSX.Element),
    inputType: string,
    labelWidth: number,
    formErrors: any,
    formfields: any
) : JSX.Element => (
    <FormGroup row key={fieldName}>
        <Label for={ fieldName } sm={ labelWidth }> { prettyFieldName }</Label>
        <Col sm={ width }>
            <Field className="form-control" name={ fieldName } component={component} type={inputType} validate={valdidations} />
            { printErrors(formErrors, formfields) }
        </Col>
    </FormGroup>
)

const printErrors = (formErrors, formfields): null | JSX.Element => {
        return formErrors && formfields && formfields.touched
            ? <span className="validation-error field-error animated fadeInDown">{ formErrors }</span>
            : null
    }
