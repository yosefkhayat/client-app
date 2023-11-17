import { ErrorMessage, Formik } from 'formik'
import React from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/store'
import { observer } from 'mobx-react-lite'
import MyTextArea from '../../app/common/form/MyTextArea'
import * as Yup from 'yup';
import ValidationErrors from '../eroors/ValidationErrors'
export default observer(function RegisterForm() {
    const { userStore } = useStore()
    return (
        <Formik
            initialValues={{ displayName: '', username: '', bio: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error =>
                setErrors({ error }))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required(),
                password: Yup.string().required(),
                bio: Yup.string().required(),

            })}

        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Listings' color='teal' textAlign='center' />
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextInput name='username' placeholder='UserName' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <MyTextArea rows={3} placeholder='Bio' name='bio' />
                    <ErrorMessage
                        name='error' render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty}
                        loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
})