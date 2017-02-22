"use strict";

import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import ActionInfo from 'material-ui/svg-icons/action/info';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import { connect } from 'react-redux';

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
            actions: {display: 'flex', flexWrap: 'wrap'}
        };

        // let importantTag = <Checkbox name="important" checkedIcon={<ToggleStar />} uncheckedIcon={<ToggleStarBorder />} />;
        let deleteTag = (
            <IconButton tooltip="Delete">
                <ActionDelete />
            </IconButton>
        );

        let checkedTag = <Checkbox name="agenda"/>;

        return (
            <div>
                <List name = "agenda">
                    <ListItem primaryText="Agenda" rightIcon={<ActionInfo />} />
                    <Divider />
                    <ListItem primaryText="Discutir Ponto 1" leftCheckbox={checkedTag} rightIcon={deleteTag} />
                    <ListItem primaryText="Discutir Ponto 2" leftCheckbox={checkedTag} rightIcon={deleteTag} />
                    <ListItem primaryText="Discutir Ponto 3" leftCheckbox={checkedTag} rightIcon={deleteTag} />
                </List>
                <RaisedButton label="New Agenda Item" primary={true} style={styles.button}/>
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
        }
    }
};

Agenda = connect(mapStateToProps, mapDispatchToProps)(Agenda);

export default Agenda;