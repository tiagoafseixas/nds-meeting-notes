import React from "react";

import { Input, Grid, Segment, TextArea, Form, Button, Header, Divider } from 'semantic-ui-react'

import { connect } from 'react-redux';

import TodoList from '../components/TodoList';
import Agenda from '../components/Agenda';
import PeopleList from '../components/PeopleList';


import { updateCurrentMinuteTitle, saveMinute } from '../actions/MinutesActions';

class MeetingDetail extends React.Component
{
    constructor()
    {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event)
    {
        event.preventDefault();
    }
        
    render()
    {
        return (
            <Form id="meetingDetailForm"
                onSubmit={(event) => this.props.saveMinute(event)}
                formMethod="post" action="/api/minutes/">
                <Header as='h3' attached='top'>
                    <Form.Input
                        id="title" name="title" placeholder="New Meeting Minute..."
                        onChange={ (event, callback) => 
                            {this.props.updateCurrentMinuteTitle(
                                event, this.props.minute.id)
                            } }
                        />
                    <Header.Subheader>
                        <Input id="date" name="date" type="date"/>
                        <Input id="time" name="time" type="time"/>
                    </Header.Subheader>
                </Header>
                <Segment attached>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment>
                                    <Agenda 
                                        agenda={this.props.state.agenda.items}/>
                                    </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <PeopleList
                                        title="Invited/Attended"
                                        items={this.props.state.invited.items}/>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider section />
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Form.TextArea
                                    id="minute" name="minute"
                                    label="Notes"
                                    placeholder="Take you notes right here..."
                                    defaultValue={this.props.minute.minute}>
                                </Form.TextArea>
                            </Grid.Column>
                        </Grid.Row>
                        <Divider section />
                        <Grid.Row>
                            <Grid.Column>
                                <Segment>
                                    <TodoList
                                        items={this.props.state.todos.items}/>
                                    </Segment>
                            </Grid.Column>
                            <Grid.Column> 
                                <Form.TextArea
                                    id="conclusions" name="conclusions"
                                    label="Conclusions"
                                    placeholder="After the meeting write your thoughts right here..."
                                    defaultValue={this.props.minute.conclusions}
                                >
                                </Form.TextArea>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={2}>
                                <Button.Group>
                                    <Button>Cancel</Button>
                                    <Button.Or />
                                    <Button positive>Save</Button>
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Form>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
   state : state
});

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        updateCurrentMinuteTitle: (event, id) => {
            dispatch(updateCurrentMinuteTitle(event.target.value, id));
        },
        saveMinute: (event) => {
            event.preventDefault();
            dispatch(saveMinute(event.target));
        }
    }
};

MeetingDetail = connect(mapStateToProps, mapDispatchToProps)(MeetingDetail);

export default MeetingDetail;