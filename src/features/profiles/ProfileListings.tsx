import React, { SyntheticEvent, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useStore } from "../../app/stores/store";
import { UserListing } from '../../app/models/profile';
import logo from '../Listings/dashboard/image.png';

const panes = [
    { menuItem: 'All Listing', pane: { key: 'all' } },
    { menuItem: `Wants to visit`, pane: { key: 'visiting' } },
    { menuItem: 'Creator of Listing', pane: { key: 'creator' } }
];

export default observer(function ProfileListings() {
    const { profileStore } = useStore();
    const {
        loadUserListings,
        profile,
        loadingListings,
        userListings
    } = profileStore;

    useEffect(() => {
        loadUserListings(profile!.username);
    }, [loadUserListings, profile]);

    const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
        loadUserListings(profile!.username, panes[data.activeIndex as number].pane.key);
    };

    return (
        <Tab.Pane loading={loadingListings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content={'Listings'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    <Card.Group itemsPerRow={4}>
                        {userListings.map((listing: UserListing) => (
                            <Card
                                as={Link}
                                to={`/listings/${listing.id}`}
                                key={listing.id}
                            >
                                <Image
                                    src={logo}
                                    style={{ minHeight: 100, objectFit: 'cover' }}
                                />
                                <Card.Content>
                                    <Card.Header textAlign='center'>{listing.address}</Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>City:{listing.city}</div>
                                        <div>Price:{listing.price}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
});