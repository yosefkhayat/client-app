import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Listing } from '../../../app/models/listing';
import ListingList from './ListingList';
import ListingDetails from '../details/ListingDetails';
import ListingForm from '../form/ListingForm';

interface Props {
    listings: Listing[];
    selectedListing: Listing | undefined;
    selectListing: (id: string) => void;
    cancelSelectListing: () => void;
    editMode: boolean;
    openForm: (id: string)=>void;
    closeForm: () => void;
    createOrEdit: (lisitng: Listing) => void;
    deleteListing: (id: string) => void;
}

export default function ListingDashboard({ listings, selectedListing, deleteListing,
    selectListing, cancelSelectListing, editMode, openForm, closeForm, createOrEdit }: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ListingList listings={listings}
                    selectListing={selectListing}
                    deleteListing={deleteListing} />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedListing && !editMode &&
                    <ListingDetails
                    listing={selectedListing}
                    cancelSelectListing={cancelSelectListing}
                    openForm={openForm}
                    />}
                {editMode &&
                    <ListingForm
                        closeForm={closeForm}
                        listing={selectedListing}
                        createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}