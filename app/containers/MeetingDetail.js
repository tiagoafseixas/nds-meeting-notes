import React from "react";

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import { Row, Col } from 'react-flexbox-grid/lib/index';

import TodoList from '../components/TodoList';
import Agenda from '../components/Agenda';
import PeopleList from '../components/PeopleList';

class MeetingDetail extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        const styles = {
            wrapper: { display: 'flex', flexWrap: 'wrap' },
            title: { fontSize: '24px' },
            titleFields: { fontSize: '14px', fontColor: "#CCC", margin: "0 1em 0 0px" }
        };

        return (
            <Card>
                <CardTitle>
                    <TextField hintText="Meeting Title" fullWidth={true} style={styles.title} />
                    <div style={styles.wrapper}>
                        <DatePicker hintText="Meeting Day" autoOk={true} style={styles.titleFields}/>
                        <TimePicker hintText="Meeting Time" autoOk={true} style={styles.titleFields}/>
                    </div>
                </CardTitle>
                <CardText>
                        <Row>
                            <Col xs={3} md={5}>
                                <Agenda />
                                <PeopleList />
                                <TodoList />
                            </Col>
                            <Col xs={3} md={7}>
                                <TextField
                                    hintText="Take you notes right here!"
                                    floatingLabelText="Meeting Minute"
                                    multiLine={true} rows={6} rowsMax={6}
                                    fullWidth={true}
                                />
                                <TextField
                                    hintText="After the meeting write your thoughts right here!"
                                    floatingLabelText="Conclusions"
                                    multiLine={true} rows={6} rowsMax={6}
                                    fullWidth={true}
                                />
                            </Col>
                        </Row>
                </CardText>
                <CardActions>
                    <FlatButton label="Save" primary={true}/>
                </CardActions>
            </Card>
        );
    }
}

export default MeetingDetail;