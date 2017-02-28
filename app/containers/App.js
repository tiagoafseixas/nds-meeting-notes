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
        if(this.props.state.minutes.current != null) {
            meetingDetail = <MeetingDetail minute={this.props.state.minutes.items[this.props.state.minutes.current]}/>;
        }
        
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Segment basic><SideBar minutes={this.props.state.minutes.items}/></Segment>
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
    state : state
});

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        addMinute: (event, callback) => {
            dispatch(addMinute());
        }
    }
};

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;