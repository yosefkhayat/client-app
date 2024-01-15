import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { Listing } from '../../../app/models/listing';
import { format } from 'date-fns';

interface Props {
    listing: Listing
}

export default observer(function ListingDetailedInfo({ listing }: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>The total area of the listing is {listing.area} squere meter</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {format( listing.dateTime!,'dd MMM yyyy h:mm aa')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{listing.address}, {listing.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})