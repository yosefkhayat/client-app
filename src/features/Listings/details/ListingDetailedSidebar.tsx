import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Listing } from '../../../app/models/listing';


interface Props {
    listing: Listing;
}

export default observer(function ActivityDetailedSidebar({ listing: { visitors, creator } }: Props) {
    if (!visitors) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {visitors.length} {visitors.length === 1 ? 'Person' : 'People'} want to visit
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {visitors.map(visitor => (
                        <Item style={{ position: 'relative' }} key={visitor.username}>
                            {visitor.username === creator?.username &&
                                <Label
                                    style={{ position: 'absolute' }}
                                    color='orange'
                                    ribbon='right'
                                >
                                    owner
                                </Label>}
                            <Image size='tiny' src={visitor.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${visitor.username}`}>{visitor.displayName}</Link>
                                </Item.Header>

                                {visitor.following &&
                                    <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>}
                            </Item.Content>
                        </Item>
                    ))} 
                </List>
            </Segment>
        </>

    )
})