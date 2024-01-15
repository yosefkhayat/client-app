import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Button, Container, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import UserListItemPlaceholder from './UserListItemPlaceholder';

export default observer(function UserManagement() {

    const { userStore } = useStore();
    const { userRegistry, loadUsers, getUsers, deleteUser, loading, loadingInitial } = userStore

    useEffect(() => {
        if (userRegistry.size <= 0) loadUsers();
    }, [userRegistry.size, loadUsers]);

    const [target, setTarget] = useState('');

    function handleDeleteSubmit(e: SyntheticEvent<HTMLButtonElement>, username: string) {
        setTarget(e.currentTarget.name);
        deleteUser(username);

    }
     
    return (
        <Container>
            <Segment>
                {loadingInitial ? (

                    <>
                        <UserListItemPlaceholder />
                        <UserListItemPlaceholder />
                    </>
                ) : (
                    <Item.Group divided>
                        {getUsers.map(u => (
                            <Item>

                                <Item.Content>
                                    <Item.Header as='a'>{u.username}</Item.Header>
                                    <Item.Meta>
                                        <span>{u.email}</span>

                                    </Item.Meta>
                                    <Item.Extra>
                                        <Button
                                            name={u.username}
                                            floated='right'
                                            color='red'
                                            onClick={(e) => handleDeleteSubmit(e, u.username)}
                                            loading={loading && target === u.username}
                                        >
                                            Delete User
                                            <Icon name='chevron right' />
                                        </Button>
                                        {u.roles.map(role => (
                                            <Label>{role}</Label>
                                        ))}

                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        ))}

                    </Item.Group>
                )}
            </Segment>
        </Container>
    )
})