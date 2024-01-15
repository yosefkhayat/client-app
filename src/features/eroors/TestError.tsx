import React, { useState } from 'react';
import { Button, Header, Segment } from "semantic-ui-react";
import axios from 'axios';
import ValidationErrors from './ValidationErrors';
import { store } from '../../app/stores/store';


export default function TestErrors() {
    const baseUrl = process.env.REACT_APP_API_URL;
    const [errors, setErrors] = useState(null);
    axios.interceptors.request.use(config => {
        const token = store.commonStore.token;
        if (token) config.headers.Authorization = `Bearer ${token}`
        return config;
    })

    function handleNotFound() {
        axios.get(baseUrl + '/buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + '/buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + '/buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + '/buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + '/listings/notaguid').catch(err => console.log(err));
    }

    function handleValidationError() {
        axios.post(baseUrl + '/listings', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header as='h1' content='Test Error component' />
            <Segment>
                <Button.Group widths='7'>
                    <Button onClick={handleNotFound} content='Not Found' basic primary />
                    <Button onClick={handleBadRequest} content='Bad Request' basic primary />
                    <Button onClick={handleValidationError} content='Validation Error' basic primary />
                    <Button onClick={handleServerError} content='Server Error' basic primary />
                    <Button onClick={handleUnauthorised} content='Unauthorised' basic primary />
                    <Button onClick={handleBadGuid} content='Bad Guid' basic primary />
                </Button.Group>
            </Segment>
            {errors &&
                <ValidationErrors errors={errors} />
                }
        </>
    )
}

