import React, { useEffect, useState } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import ListingList from './ListingList';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import ListingFilter from './ListingFilters';
import { PagingParams } from '../../../app/models/pagination';
import InfiniteScroll from 'react-infinite-scroller';
import ListingListItemPlaceholder from './ListingListItemPlaceholder';



export default observer(function ListingDashboard() {

    const { listingStore } = useStore();
    const { loadListings, listingRegistry, setPagingParams, pagination } = listingStore
    const [loadingNext, setLoadingNext] = useState(false);

    function HandleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadListings().then(() => setLoadingNext(false));

    }

    useEffect(() => {
        if (listingRegistry.size<=1) loadListings();
    }, [listingRegistry.size, loadListings]);


    return (
        <Grid>
            <Grid.Column width='10'>
                {listingStore.loadingInitial && !loadingNext ? (

                    <>
                        <ListingListItemPlaceholder />
                        <ListingListItemPlaceholder />
                    </>
                ) : (
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={HandleGetNext}
                            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                            initialLoad={false}
                        >
                            <ListingList />
                        </InfiniteScroll>

                )}
               
            </Grid.Column>
            <Grid.Column width='6'>
                <ListingFilter/>
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})