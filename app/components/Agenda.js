"use strict";

import React from 'react';
import { connect } from 'react-redux';

import { List, Button, Icon, TextArea, Item } from 'semantic-ui-react'

import BooleanSelect from './BooleanSelect';
import { addAgendaItem, removeAgendaItem } from '../actions/AgendaActions';

class Agenda extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        console.log("this is agenda render");
        console.log(this.props.agenda);

        let agendaList = null;
        if(Object.keys(this.props.agenda).map) {
            agendaList = (
                <div>
                {Object.keys(this.props.agenda).map( (key) => 
                    <List.Item key={key}>
                        <List.Content floated='left'>
                            <BooleanSelect
                                    key={key} name="agendaItemCompleted" placeholder="Done?"
                                    />
                        </List.Content>
                        <List.Content floated='right'>
                            <Button onClick={() => this.props.removeAgendaItem(key)} icon>
                                <Icon name='delete'/>
                            </Button>
                        </List.Content>
                        <List.Content>
                            <TextArea key={key} name="agendaDescription" placeholder="Agenda Item" autoHeight
                                defaultValue={this.props.agenda[key].description} />
                        </List.Content>
                    </List.Item>
                    )}
                </div>
            );
        }

        return (
            <div id = "agendaWrapperDiv">
                <List divided verticalAlign='middle' name = "agenda">
                    <List.Header as="h4">Meeting Agenda</List.Header>
                    {agendaList}
                </List>
                <Button primary basic type="button" onClick={() => this.props.addAgendaItem()}>Add Agenda Item</Button>
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