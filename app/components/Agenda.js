"use strict";

import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

import ActionFavorite from 'material-ui/svg-icons/toggle/star';
import ActionFavoriteBorder from 'material-ui/svg-icons/toggle/star-border';

class Agenda extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        let importantTag = <Checkbox name="important" checkedIcon={<ActionFavorite />} uncheckedIcon={<ActionFavoriteBorder />} />;
        let checkedTag = <Checkbox name="agenda"/>;

        return (
            <List name = "agenda">
                <Subheader>Agenda</Subheader>
                <ListItem primaryText="Discutir Ponto 1" leftCheckbox={checkedTag} rightToggle={importantTag} />
                <ListItem primaryText="Discutir Ponto 2" leftCheckbox={checkedTag} rightToggle={importantTag} />
                <ListItem primaryText="Discutir Ponto 3" leftCheckbox={checkedTag} rightToggle={importantTag} />
            </List>
        );
    }
}

export default Agenda;