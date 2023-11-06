import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ListingList from './ListingList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';



export default observer(function ListingDashboard() {

    const { listingStore } = useStore();
    const { loadListings, listingRegistry } = listingStore

    useEffect(() => {
        if (listingRegistry.size<=1) loadListings();
    }, [listingRegistry.size, loadListings]);

    if (listingStore.loadingInitial) return <LoadingComponent content='loading app ' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <ListingList />
            </Grid.Column>
            <Grid.Column width='6'>
               
            </Grid.Column>
        </Grid>
    )
})