import React from "react";

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';

import { addMinute, setMinute } from '../actions/MinutesActions';
import { connect } from 'react-redux';

class SideBar extends React.Component
{
    constructor()
    {
        super();
    }
    render()
    {
        let meetingList = null;
        if(this.props.minutes) {
            meetingList = (
                <List>
                    <Subheader>My Meetings</Subheader>
                    {Object.keys(this.props.minutes).map( (key) => <ListItem key={key} onClick={() => this.props.setMinute(key)}> {this.props.minutes[key].title} </ListItem>)}
                </List>
            );
        }
        
        return (
        <Paper>
            <List>
                <ListItem primaryText="New Meeting" rightIcon={<ActionNoteAdd />}
                    onClick={(event) => this.props.addMinute(event)} />    
            </List>
            <Divider />
            {meetingList}
        </Paper>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    state : state
});

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        addMinute: (event, callback) => dispatch(addMinute()),
        setMinute: (id) => dispatch(setMinute(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);