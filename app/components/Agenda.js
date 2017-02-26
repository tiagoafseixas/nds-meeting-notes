"use strict";

import React from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionInfo from 'material-ui/svg-icons/action/info';

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
            listItem : {paddingBottom: 0},
            checkbox : {top: '25px'},
            trash : {top:"12px"}
        };

        let checkedTag = (
            <div>
                <Checkbox
                    name="agendaItemCompleted" style={styles.checkbox}
                    defaultChecked={false}/>
            </div>
        );
        let deleteTag = ( (key) =>
            <IconButton tooltip="Delete" onClick={() => this.props.removeAgendaItem(key)} style={styles.trash}>
                <ActionDelete />
            </IconButton>
        );

        return (
            <div>
                <List name = "agenda">
                    <ListItem primaryText="Agenda" rightIcon={<ActionInfo />} style={styles.listItem}/>
                    <Divider />
                    {Object.keys(this.props.agenda).map( (key) => 
                        <ListItem key={key}
                            primaryText={<TextField key = {key} name = "agendaDescription"  multiLine={true}/>}
                            leftCheckbox={checkedTag}
                            rightIconButton={deleteTag(key)}
                            style={styles.listItem} />
                    )}
                </List>
                <FlatButton label="New Agenda Item" primary={true} style={styles.button} onClick={() => this.props.addAgendaItem()}/>
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