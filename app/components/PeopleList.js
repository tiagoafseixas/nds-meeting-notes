"use strict";

import React from 'react';
import { connect } from 'react-redux';

// Components
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';

// Buttons
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

//Images
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionInfo from 'material-ui/svg-icons/action/info';

import { addPersonItem, removePersonItem } from '../actions/InvitedActions';

class PeopleList extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        const styles = {
            button: {margin: 12},
            listItem : {paddingBottom: 0},
            checkbox : {top: '25px'},
            trash : {top:"12px"}
        };

        let checkedTag = <Checkbox name="invitedItemAttended" style={styles.checkbox} />;
        let deleteTag = ( (key) =>
            <IconButton tooltip="Delete" onClick={() => this.props.removePersonItem(key)} style={styles.trash}>
                <ActionDelete />
            </IconButton>
        );

        return (
            <div>
                <List>
                    <ListItem primaryText={this.props.title} rightIcon={<ActionInfo />} />
                    <Divider />
                    {Object.keys(this.props.items).map( (key) => 
                        <ListItem
                            key={key}
                            primaryText={<TextField key = {key} name = "invitedName" />}
                            leftCheckbox={checkedTag}
                            rightIconButton={deleteTag(key)}
                            style={styles.listItem}
                        />
                    )}
                    
                </List>
                <RaisedButton label="Add Invited" primary={true} style={styles.button} onClick={() => this.props.addPersonItem()}/>
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