"use strict";

import React from 'react';
import { connect } from 'react-redux';

import { List, Button, Icon, Item, Input } from 'semantic-ui-react'
import { addPersonItem, removePersonItem } from '../actions/InvitedActions';
import BooleanSelect from './BooleanSelect';

class PeopleList extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        return (
            <div id="invitedListWrapper">
                <List>
                    <List.Header as="h4">{this.props.title}</List.Header>
                    {Object.keys(this.props.items).map( (key) =>
                        <List.Item key={key}>
                            <List.Content floated='left'>
                                <BooleanSelect key={key} name="invitedItemAttended" placeholder="Attended?"/>
                            </List.Content>
                            <List.Content floated='right'>
                                <Button onClick={() => this.props.removePersonItem(key)} icon>
                                    <Icon name='delete'/>
                                </Button>
                            </List.Content>
                            <List.Content>
                                <Input key={key} name="invitedName" placeholder="Insert name here..."/>
                            </List.Content>
                        </List.Item>
                    )}
                </List>
                <Button primary basic type="button" onClick={() => this.props.addPersonItem()}>Add Invited</Button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    state : state
});

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        addPersonItem: (event, callback) => {
            dispatch(addPersonItem());
        },

        removePersonItem : (id) => {
            dispatch(removePersonItem(id));
        }
    }
};

PeopleList = connect(mapStateToProps, mapDispatchToProps)(PeopleList);

export default PeopleList;