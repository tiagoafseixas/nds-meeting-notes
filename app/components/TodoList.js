"use strict";

import React from "react";

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

class TodoList extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        return (
            <List>
                <Subheader>Follow Up</Subheader>
                <ListItem primaryText="Discutir Ponto 1" leftCheckbox={<Checkbox />} />
                <ListItem primaryText="Discutir Ponto 2" leftCheckbox={<Checkbox />} />
                <ListItem primaryText="Discutir Ponto 3" leftCheckbox={<Checkbox />} />
            </List>
        )
    }
}

export default TodoList;