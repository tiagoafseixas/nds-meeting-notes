import React from "react";

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import { Row, Col } from 'react-flexbox-grid/lib/index';

import { connect } from 'react-redux';

import TodoList from '../components/TodoList';
import Agenda from '../components/Agenda';
import PeopleList from '../components/PeopleList';

import { updateCurrentMinuteTitle } from '../actions/MinutesActions';

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
        const styles = {
            wrapper: { display: 'flex', flexWrap: 'wrap' },
            title: { fontSize: '24px' },
            titleFields: { fontSize: '14px', fontColor: "#888", margin: "0 1em 0 0px" },
            button: {margin: 12}
        };

        return (
            <Card>
                <form onSubmit={this.handleSubmit}>
                    <CardTitle>
                        <TextField
                            id="title" name="title"
                            hintText="Meeting Title" fullWidth={true} style={styles.title} value={this.props.minute.title}
                            onChange={ (event, callback) => {this.props.updateCurrentMinute(event, callback)} } />
                        <div style={styles.wrapper}>
                            <DatePicker id="date" name="date" hintText="Meeting Day" autoOk={true} textFieldStyle={styles.titleFields} />
                            <TimePicker id="time" name="time" hintText="Meeting Time" autoOk={true} textFieldStyle={styles.titleFields} defaultTime={this.props.minute.time}/>
                        </div>
                    </CardTitle>
                    <CardText>
                            <Row>
                                <Col  xs={3} md={6}>
                                    <Agenda agenda={this.props.state.agenda.items}/>
                                </Col>
                                <Col  xs={3} md={6}>
                                    <PeopleList title="Invited/Attended" items={this.props.minute.invited}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Divider />
                                </Col>
                            </Row>
                            <Row>
                                <Col  xs={3} md={12}>
                                    <TextField
                                        id="minute" name="minute"
                                        hintText="Take you notes right here!"
                                        floatingLabelText="Meeting Minute"
                                        multiLine={true} rows={6} rowsMax={6}
                                        fullWidth={true} value={this.props.minute.minute}
                                    />
                                </Col>
                            </Row>
                            <Divider />
                            <Row>
                                <Col xs={3} md={5}>
                                    <TodoList />
                                </Col>
                                <Col xs={3} md={7}> 
                                    <TextField
                                        id="conclusions" name="conclusions"
                                        hintText="After the meeting write your thoughts right here!"
                                        floatingLabelText="Conclusions"
                                        multiLine={true} rows={6} rowsMax={6}
                                        fullWidth={true} value={this.props.minute.conclusions}
                                    />
                                </Col>
                            </Row>
                    </CardText>
                    <CardActions>
                        <FlatButton label="Save" primary={true} type="submit"/>
                    </CardActions>
                </form>
            </Card>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
   state : state
});

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        updateCurrentMinute: (event, callback) => {
            dispatch(updateCurrentMinuteTitle(event.target.value));
        }
    }
};

MeetingDetail = connect(mapStateToProps, mapDispatchToProps)(MeetingDetail);

export default MeetingDetail;