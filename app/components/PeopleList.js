"use strict";

import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import Divider from 'material-ui/Divider';

import ActionInfo from 'material-ui/svg-icons/action/info';

class PeopleList extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        return (
            <List>
                <ListItem primaryText={this.props.title} rightIcon={<ActionInfo />} />
                <Divider />
                <ListItem
                    primaryText="Ze das Couves"
                    leftCheckbox={<Checkbox />}
                />
            </List>
        );
    }
}

export default PeopleList;