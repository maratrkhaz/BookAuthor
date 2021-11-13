import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux';
import { Button, Header, Label } from 'semantic-ui-react'
import CustomTextInput from '../../app/common/form/CustomTextInput'
import { IUserFormValues } from '../../app/models/userType';
import * as actions from '../../app/store/actions/userAction';
import * as Yup from 'yup';

function UserLoginForm() {
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required.').email('Email is invalid.'),
        password: Yup.string().required('Password is required.'),
      })

    function handleFormSubmit(valueSubmitted: IUserFormValues) {
        dispatch(actions.Login(valueSubmitted));
      }

    return (
        <Formik
            enableReinitialize
            initialValues={{email:'', password:''}}
            validationSchema={validationSchema}
            onSubmit={values => handleFormSubmit(values)}
        >
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to continue' color='teal' textAlign='left' />
                    <CustomTextInput name='email' placeholder='Email' />
                    <CustomTextInput name='password' placeholder='Password' type='password' />
                    {/* <ErrorMessage name='error' render={() => 
                    <Label style={{marginBottom: 8}} basic color='red' content={error from redux store errorReducer} />}
                    /> */}
                    <Button 
                        disabled={/*isSubmitting ||*/ !dirty || !isValid}
                        positive content='Login' type='submit' fluid
                    />
                </Form>
                
            )}

        </Formik>
    )
}

export default UserLoginForm
