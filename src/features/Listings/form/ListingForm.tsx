import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ListingForm() {
    const { listingStore } = useStore();
    const { selectedListing, closeForm, createListing, updateListing, loading } = listingStore;


    const initailState = selectedListing ?? {
        id: '',
        address: '',
        city: '',
        area: 0,
        dateTime: new Date(),
        postalCode: '',
        price: 0,
        region:''
    }

    const [listing, setListing] = useState(initailState);
    function handleSubmit() {
        listing.id ? updateListing(listing) : createListing(listing);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setListing({ ...listing, [name]: value })

    }
    return (

        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='address' value={listing.address} name='address' onChange={handleInputChange} />
                <Form.Input placeholder='city' value={listing.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='region' value={listing.region} name='region' onChange={handleInputChange} />
                <Form.Input placeholder='price' value={listing.price} name='price' onChange={handleInputChange} />
                <Form.Input placeholder='area' value={listing.area} name='area' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' tyoe='button' content='Cancel' />
            </Form>
        </Segment>

    )
})