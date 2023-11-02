import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Listing } from '../../../app/models/listing';

interface Props {
    listing: Listing | undefined;
    closeForm: () => void;
    createOrEdit: (listing: Listing) => void;
}

export default function ListingForm({ listing:selectedListing, closeForm, createOrEdit }: Props) {
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
        createOrEdit(listing);
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
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' tyoe='button' content='Cancel' />
            </Form>
        </Segment>

    )
}