import React from "react";
import { Menu, Icon } from 'semantic-ui-react';
import { addMinute, setMinute, loadMinutes, setCurrentMinute } from '../actions/MinutesActions';
import { connect } from 'react-redux';

class SideBar extends React.Component
{
    constructor()
    {
        super();
    }

    componentDidMount()
    {
        this.props.loadMinutes();
    }

    render()
    {
        console.log("render sidebar");
        console.log(this.props.minutes);
        var activeItem = this.props.activeItem;
        let meetingList = null;
        if(this.props.minutes) {
            meetingList = (
                <Menu.Menu>
                    {Object.keys(this.props.minutes).map( (key) => 
                        <Menu.Item
                            key={key} onClick={() => this.props.setMinute(key)}
                            name={key} active={activeItem==key}>
                            {this.props.minutes[key].title}
                        </Menu.Item>
                    )}
                </Menu.Menu>
            );
        }
        
        return (
        <Menu pointing vertical fluid>
            <Menu.Item name='newMinute' onClick={(event) => this.props.addMinute(event)}>
                New Minute <Icon name='add' />
            </Menu.Item>
            <Menu.Item>
                <Menu.Header>My Meetings</Menu.Header>
                {meetingList}
            </Menu.Item>
        </Menu>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    state : state,
    activeItem : state.activeItem
});

const mapDispatchToProps = (dispatch, ownProps) =>
{
    return {
        addMinute: (event, callback) => dispatch(addMinute()),
        setMinute: (id) => dispatch(setCurrentMinute(id)),
        loadMinutes: () => dispatch(loadMinutes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);