"use strict";

import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import ToggleStar from 'material-ui/svg-icons/toggle/star';
import ToggleStarBorder from 'material-ui/svg-icons/toggle/star-border';
import ActionInfo from 'material-ui/svg-icons/action/info';

class Agenda extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        let importantTag = <Checkbox name="important" checkedIcon={<ToggleStar />} uncheckedIcon={<ToggleStarBorder />} />;
        let checkedTag = <Checkbox name="agenda"/>;

        return (
            <List name = "agenda">
                <ListItem primaryText="Agenda" rightIcon={<ActionInfo />} />
                <Divider />
                <ListItem primaryText="Discutir Ponto 1" leftCheckbox={checkedTag} rightIcon={importantTag} />
                <ListItem primaryText="Discutir Ponto 2" leftCheckbox={checkedTag} rightIcon={importantTag} />
                <ListItem primaryText="Discutir Ponto 3" leftCheckbox={checkedTag} rightIcon={importantTag} />
            </List>
        );
    }
}

export default Agenda;