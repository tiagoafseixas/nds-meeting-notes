import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid/lib/index'
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
        console.log(">render App");
        console.log(this.props.state);

        let meetingDetail = null;
        if(typeof this.props.state.minutes.current != "undefined") {
            meetingDetail = <MeetingDetail minute={this.props.state.minutes.current}/>;
        }
        return (
            <MuiThemeProvider>
                <Grid>
                    <Row>
                        <Col xs={0} md={3}>
                            <SideBar minutes={this.props.state.minutes}/>
                        </Col>

                        <Col xs={3} md={9}>
                            {meetingDetail}
                        </Col>
                    </Row>
                </Grid>
            </MuiThemeProvider>
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
            console.log("callback");
            dispatch(addMinute());
        }
    }
};

App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;