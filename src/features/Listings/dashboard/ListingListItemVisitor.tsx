import { observer } from 'mobx-react-lite'
import React from 'react'
import { Image, List, Popup } from 'semantic-ui-react'
import { Profile } from '../../../app/models/profile'
import { Link } from 'react-router-dom';
import ProfileCard from '../../profiles/ProfileCard';
interface Props {
    visitors: Profile[];
}

export default observer(function ListingListItemVisitor({ visitors }: Props) {

    const styles = { 
        borderColor: 'teal',
        borderWidth:3
    }

    return (
        <List horizontal>
            {visitors.map(visitor => (
                <Popup
                    hoverable
                    key={visitor.username}
                    trigger={
                        <List.Item key={visitor.username} as={Link} to={`/profiles/${visitor.username}`}>
                            <Image
                                bordered
                                style={visitor.following ? styles : null}
                                size='mini'
                                circular
                                src={visitor.image || '/assets/user.png'} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={visitor}/>
                    </Popup.Content>
                </Popup>
                
            ))}     
        </List>
    )
})