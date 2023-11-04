import React from 'react';
import { Grid } from 'semantic-ui-react';
import ListingList from './ListingList';
import ListingDetails from '../details/ListingDetails';
import ListingForm from '../form/ListingForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';



export default observer(function ListingDashboard() {

    const { listingStore } = useStore();
    const { selectedListing, editMode } = listingStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ListingList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedListing && !editMode &&
                    <ListingDetails />}
                {editMode &&
                    <ListingForm />}
            </Grid.Column>
        </Grid>
    )
})