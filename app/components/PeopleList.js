"use strict";

import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

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
                <Subheader>Invited/Attended</Subheader>
                <ListItem
                    primaryText="Ze das Couves"
                    leftCheckbox={<Checkbox />}
                />
            </List>
        );
    }
}

export default PeopleList;