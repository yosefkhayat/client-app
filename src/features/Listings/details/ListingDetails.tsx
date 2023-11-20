import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ListingDetailedHeader from './ListingDetailedHeader';
import ListingDetailedInfo from './ListingDetailedInfo';
import ListingDetailedChat from './ListingDetailedChat';
import ListingDetailedSidebar from './ListingDetailedSidebar';


export default observer( function ListingDetails() {
    const { listingStore } = useStore();
    const { selectedListing: listing, loadListing, loadingInitial } = listingStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadListing(id);
    }, [id, loadListing])

    if (loadingInitial || !listing) return <LoadingComponent/>;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ListingDetailedHeader listing={ listing } />
                <ListingDetailedInfo listing={ listing } />
                <ListingDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ListingDetailedSidebar listing={listing} />
            </Grid.Column>
        </Grid>
    )
})