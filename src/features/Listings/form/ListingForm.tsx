import React, {  useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid'
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { regionOptions } from '../../../app/common/options/regionOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { ListingFormValues } from '../../../app/models/listing';
import MyTextArea from '../../../app/common/form/MyTextArea';

export default observer(function ListingForm() {
    const history = useHistory();
    const { listingStore } = useStore();
    const {  createListing, updateListing, loadListing, loadingInitial } = listingStore;
    const { id } = useParams<{ id: string }>();

    const [listing, setListing] = useState<ListingFormValues>(new ListingFormValues());

    const validationSchema = Yup.object({
        address: Yup.string().required('The listing adress is required!'),
        city: Yup.string().required('The listing city is required!'),
        region: Yup.string().required('The listing region is required!'),
        price: Yup.number().required(),
        area: Yup.number().required(),
        postalCode: Yup.string().required('The listing postal code is required!'),
        dateTime: Yup.string().required().nullable()
    })

    useEffect(() => {
        if (id) loadListing(id).then(listing => setListing(new ListingFormValues(listing)))
    }, [id, loadListing]);
    
    function handleFormSubmit(listing: ListingFormValues) {
        if (!listing.id) {
            let newListing = {
                ...listing,
                id: uuid()
            };
            createListing(newListing).then(() => history.push(`/listings/${newListing.id}`))
        } else {
            updateListing(listing).then(() => history.push(`/listings/${listing.id}`))
        }
    }

  
    if (loadingInitial) return <LoadingComponent content='Loading listing...'/>

    return (

        <Segment clearing>
            <Header content='Listing Details' sub color='teal'/>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={listing}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting,dirty }) => (
                    <Form className='ui form ' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Address' name='address' />
                        <MyTextInput placeholder='City' name='city' />
                        <MySelectInput options={regionOptions} placeholder='region' name='region' />
                        <MyTextInput placeholder='Price' name='price' />
                        <MyTextInput placeholder='Area' name='area' />
                        <MyDateInput
                            placeholderText='Date'
                            name='dateTime'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa '

                        />
                        <MyTextInput placeholder='postal code' name='postalCode' />
                        <Header content='Description Details will go here' sub color='teal' />
                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/listings' floated='right' tyoe='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
            
        </Segment>

    )
})