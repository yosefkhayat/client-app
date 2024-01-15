import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ListingDashboard from '../../features/Listings/dashboard/ListingDashboard';
import ListingForm from '../../features/Listings/form/ListingForm';
import ListingDetails from '../../features/Listings/details/ListingDetails';
import React, { useEffect } from 'react';
import TestErrors from '../../features/eroors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/eroors/NotFound';
import ServerError from '../../features/eroors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import UserManagement from '../../features/management/UserManagement';
import PrivateRoute from './PrivateRoute';


function App() {
    const location = useLocation();
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])

    if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

    return (
        <>
            <ToastContainer position='bottom-right' hideProgressBar />
            <ModalContainer /> 
            <Route exact path='/' component={HomePage} />
            <Route
                path={'/(.+)'}
                render={() => (
                    <>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }} >
                            <Switch>
                                <PrivateRoute exact path='/listings' component={ListingDashboard} />
                                <PrivateRoute path='/listings/:id' component={ListingDetails} />
                                <PrivateRoute key={location.key} path={['/createListing', '/manage/:id']} component={ListingForm} />
                                <PrivateRoute path='/profiles/:username' component={ProfilePage} />
                                <PrivateRoute path='/errors' component={TestErrors} />
                                <Route path='/server-error' component={ServerError} />
                                <Route path='/login' component={LoginForm} />
                                <PrivateRoute path='/management' component={UserManagement}/>
                                <Route component={NotFound} />
                            </Switch>
                        </Container>
                    </>

                )}
                />
            
        </>
    );
}
export default observer(App);
