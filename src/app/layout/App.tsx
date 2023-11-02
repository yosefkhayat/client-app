import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ListingDashboard from '../../features/Listings/dashboard/ListingDashboard';
import { Listing } from '../models/listing';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

function App() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [selectedListing, setSelectedListing] = useState<Listing | undefined>(undefined);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get<Listing[]>('http://localhost:5063/api/Listings').then(response => {
            setListings(response.data);
        })
    }, []);

    function handleSelectListing(id: string) {
        setSelectedListing(listings.find(x => x.id === id));
}
    function handleCancelSelectlisting() {
        setSelectedListing(undefined);
    }

    function handelFormOpen(id?: string) {
        id ? handleSelectListing(id) : handleCancelSelectlisting();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditListing(listing: Listing) {
        listing.id
            ? setListings([...listings.filter(x => x.id !== listing.id), listing])
            : setListings([...listings, { ...listing, id:uuid()}]);
        setEditMode(false);
        setSelectedListing(listing);
    }
    function handleDeleteListing(id: string) {
        setListings([...listings.filter(x=>x.id !== id)])
    }

    

    return (
        <>
            <NavBar openForm={handelFormOpen} />
            <Container style={{marginTop:'7em'} }>
                <ListingDashboard
                    listings={listings}
                    selectedListing={selectedListing}
                    selectListing={handleSelectListing}
                    cancelSelectListing={handleCancelSelectlisting}
                    editMode={editMode}
                    openForm={handelFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditListing}
                    deleteListing={handleDeleteListing}
                />
            </Container>
        </>
    );
}

export default App;
