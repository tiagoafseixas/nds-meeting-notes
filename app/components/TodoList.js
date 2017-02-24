"use strict";

import React from "react";
import { connect } from 'react-redux';

// Components
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

// Buttons
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

//Images
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionInfo from 'material-ui/svg-icons/action/info';

import { addTodoItem, removeTodoItem } from '../actions/TodoActions';

class TodoList extends React.Component
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

        let checkedTag = <Checkbox name="todoItemCompleted" style={styles.checkbox} />;
        let deleteTag = ( (key) =>
            <IconButton tooltip="Delete" onClick={() => this.props.removeTodoItem(key)} style={styles.trash}>
                <ActionDelete />
            </IconButton>
        );

        return (
            <div>
                <List>
                    <ListItem primaryText="Follow Up" rightIcon={<ActionInfo />} />
                    <Divider />
                    {Object.keys(this.props.items).map( (key) => 
                            <ListItem
                                key={key}
                                primaryText={<TextField key = {key} name = "todoDescription" multiLine={true}/>}
                                leftCheckbox={checkedTag}
                                rightIconButton={deleteTag(key)}
                                style={styles.listItem}
                            />
                        )}
                </List>
                <FlatButton label="Add Item" primary={true} style={styles.button} onClick={() => this.props.addTodoItem()}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    state : state
});

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        addTodoItem: (event, callback) => {
            dispatch(addTodoItem());
        },

        removeTodoItem : (id) => {
            dispatch(removeTodoItem(id));
        }
    }
};

TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default TodoList;