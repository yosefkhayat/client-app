import React, { Fragment } from 'react';
import { Segment, Button, Placeholder, Icon } from 'semantic-ui-react';

export default function UserListItemPlaceholder() {
    return (
        <Fragment>
            <Placeholder fluid >
                <Segment.Group >
                    <Segment style={{ minHeight: 110 }}>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                
                            </Placeholder.Header>
                            
                        </Placeholder>
                        <Button disabled color='red' floated='right' >
                            Delete User
                            <Icon name='chevron right' />
                        </Button>
                    </Segment>
                    
                </Segment.Group>
            </Placeholder>
        </Fragment>
    );
};
