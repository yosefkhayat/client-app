import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ListingDashboard from '../../features/Listings/dashboard/ListingDashboard';
import ListingForm from '../../features/Listings/form/ListingForm';
import ListingDetails from '../../features/Listings/details/ListingDetails';
import React from 'react';


function App() {
    const  location = useLocation();

    return (
        <>
            <Route exact path='/' component={HomePage} />
            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }} >
                            <Route exact path='/listings' component={ListingDashboard} />
                            <Route path='/listings/:id' component={ListingDetails} />
                            <Route key={location.key} path={['/createListing', '/manage/:id']} component={ListingForm} />
                        </Container>
                    </>

                )}
                />
            
        </>
    );
}
export default observer(App);
