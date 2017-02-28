"use strict";

import React from "react";
import { connect } from 'react-redux';

import { List, Button, Icon, Item, TextArea } from 'semantic-ui-react'
import { addTodoItem, removeTodoItem } from '../actions/TodoActions';
import BooleanSelect from './BooleanSelect';

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

        return (
            <div id="todoListWrapper">
                <List>
                    <List.Header as="h4">Follow Up</List.Header>
                    {Object.keys(this.props.items).map( (key) =>
                        <List.Item key={key}>
                            <List.Content floated='left'>
                                <BooleanSelect key={key} name="todoItemCompleted" placeholder="Done?"/>
                            </List.Content>
                            <List.Content floated='right'>
                                <Button onClick={() => this.props.removeTodoItem(key)} icon>
                                    <Icon name='delete'/>
                                </Button>
                            </List.Content>
                            <List.Content>
                                <TextArea key={key} name="todoDescription" placeholder="Follow up task..."/>
                            </List.Content>
                        </List.Item>
                        )}
                </List>
                <Button primary basic type="button" onClick={() => this.props.addTodoItem()}>Add Item</Button>
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