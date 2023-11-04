import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ListingDashboard from '../../features/Listings/dashboard/ListingDashboard';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';

function App() {
    const { listingStore } = useStore();

    useEffect(() => {
        listingStore.loadListings();
    }, [listingStore]);

    if (listingStore.loadingInitial) return <LoadingComponent content='loading app ' />

    return (
        <>
            <NavBar />
            <Container style={{marginTop:'7em'} }>
                <ListingDashboard/>
            </Container>
        </>
    );
}
export default observer(App);
