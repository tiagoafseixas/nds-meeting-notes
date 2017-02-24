"use strict";

import React from 'react';
import { connect } from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import { addAgendaItem, removeAgendaItem } from '../actions/AgendaActions';

class Agenda extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        const styles = {
            button: {margin: 12},
            listItem : {padding: "0px"},
            actions: {display: 'flex', flexWrap: 'wrap'},
            checkbox : {top: '25px'},
            trash : {top:"12px"}
        };

        let checkedTag = <Checkbox name="agendaItemCompleted" style={styles.checkbox} />;
        let deleteTag = ( (key) =>
            <IconButton tooltip="Delete" onClick={() => this.props.removeAgendaItem(key)} style={styles.trash}>
                <ActionDelete />
            </IconButton>
        );
        
        console.log("#Agenda -> rendering agenda.");
        console.log(this.props.agenda);
        return (
            <div>
                <List name = "agenda">
                    <ListItem primaryText="Agenda" rightIcon={<ActionInfo />} style={styles.listItem}/>
                    <Divider />
                    {Object.keys(this.props.agenda).map( (key) => 
                        <ListItem key={key}
                            primaryText={<TextField key = {key} name = "agendaDescription" />}
                            leftCheckbox={checkedTag}
                            rightIconButton={deleteTag(key)} />
                    )}
                </List>
                <RaisedButton label="New Agenda Item" primary={true} style={styles.button} onClick={() => this.props.addAgendaItem()}/>
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
        addAgendaItem: (event, callback) => {
            dispatch(addAgendaItem());
        },

        removeAgendaItem : (id) => {
            dispatch(removeAgendaItem(id));
        }
    }
};

Agenda = connect(mapStateToProps, mapDispatchToProps)(Agenda);

export default Agenda;