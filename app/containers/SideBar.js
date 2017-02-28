import React from "react";
import { Menu, Icon } from 'semantic-ui-react';
import { addMinute, setMinute, loadMinutes } from '../actions/MinutesActions';
import { loadMinutesThunk } from '../reducers/MinutesReducers';
import { connect } from 'react-redux';

class SideBar extends React.Component
{
    constructor()
    {
        super();
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    componentDidMount()
    {
        console.log("running loadMinutesThunk");
        this.props.loadMinutesThunk();
    }

    handleItemClick(e, { name })
    {
        this.setState({ activeItem: name })
    }

    render()
    {
        var activeItem = this.props.activeItem;

        let meetingList = null;
        if(this.props.minutes) {
            meetingList = (
                <Menu.Menu>
                    {Object.keys(this.props.minutes).map( (key) => 
                        <Menu.Item
                            key={key} onClick={() => this.props.setMinute(key)}
                            name={key} active={activeItem==key}
                            onClick={this.handleItemClick}>
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
        setMinute: (id) => dispatch(setMinute(id)),
        loadMinutes: () => dispatch(loadMinutes()),
        loadMinutesThunk: () => dispatch(loadMinutesThunk())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);