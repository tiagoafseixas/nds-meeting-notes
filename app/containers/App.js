import React from "react";

import { Grid, Segment } from 'semantic-ui-react'

import MeetingDetail from './MeetingDetail.js'
import SideBar from './SideBar';

import { connect } from 'react-redux';

class App extends React.Component
{
    constructor()
    {
        super();
    }

    render()
    {
        let meetingDetail = null;
        if(this.props.currentMinute != null) {
            console.log(this.props.minutes);
            meetingDetail = <MeetingDetail minute={this.props.minutes[this.props.currentMinute]}/>;
        }
        
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Segment basic><SideBar minutes={this.props.minutes}/></Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Segment basic>{meetingDetail}</Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}


const mapStateToProps = (state, ownProps) => ({
    minutes : state.minutes.items,
    currentMinute : state.minutes.current
});

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        addMinute: (event, callback) => {
            dispatch(addMinute());
            // reset agenda, invited e todos
        }
    }
};

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;