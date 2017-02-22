import React from "react";

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import { addMinute } from '../actions';
import { connect } from 'react-redux';

class SideBar extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        console.log(this.props);
        console.log("here");
        return (
        <Paper>
            <List>
                <ListItem primaryText="New Meeting" rightIcon={<ActionNoteAdd/>}
                    onClick={(event) => this.props.addMinute(event)} />    
            </List>
            <Divider />
            <List>
                <Subheader>My Meetings</Subheader>
                {this.props.minutes.map( (minute) => <ListItem key={minute._id}> {minute.title} </ListItem>)}
            </List>
        </Paper>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    
});

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        addMinute: (event, callback) => {
            console.log("callback");
            dispatch(addMinute());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);