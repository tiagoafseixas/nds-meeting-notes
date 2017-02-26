"use strict";

import { ADD_MINUTE, UPDATE_CURRENT_MINUTE_TITLE, GET_MINUTE, SET_MINUTE, SAVE_MINUTE } from '../actions/MinutesActions';

var $ = require('jQuery');
var Immutable = require('immutable');

const API_URL = 'http://localhost:8080/api/';

const NEW_MINUTE_ITEM = (id) => { return {
    title : "",
    date : new Date(),
    time : null,
    conclusions : "",
    minute : "",
    agenda : {},
    invited : {},
    attended : {},
    changed : true,
    id: id
}};

export function minutes(state = { items : {}, current: null}, action)
{
    switch (action.type)
    {
        case ADD_MINUTE:
            console.log("#minutes -> ADD_MINUTE")
            var oldItems = Immutable.Map(state.items);
            var newMinuteId = "NEW";

            return Immutable.Map({
                items : oldItems.set(newMinuteId, NEW_MINUTE_ITEM(newMinuteId)).toObject(),
                current : newMinuteId
            }).toObject();

        case UPDATE_CURRENT_MINUTE_TITLE:
            console.log("#minutes -> UPDATE_CURRENT_MINUTE_TITLE");
            console.log(action.id);
            console.log(action.title);
            var title = action.title;
            var oldItems = Immutable.Map(state.items).toObject();
            oldItems[action.id].title = title;

            console.log(Immutable.Map({
                items : oldItems,
                current : state.current
            }).toObject());

            return Immutable.Map({
                items : oldItems,
                current : state.current
            }).toObject();

        case SET_MINUTE:
            console.log("#minutes -> SET_MINUTE");  
            console.log(action.id);

            var oldState = Immutable.Map(state);
            var newState = oldState.set("current", action.id);
            return newState.toObject();

        case SAVE_MINUTE:
            console.log("#minutes -> SAVE_MINUTE");
            console.log(action);

            var form = $("#meetingDetailForm");
            //form.find(':checkbox:not(:checked)').attr('value', 'off');
            //form.find(':checkbox(:checked)').attr('value', 'on');
            console.log(form.serialize());
            console.log(form);

            /**$.post({
                url : API_URL + 'minutes/', // Gets the URL to sent the post to
                data : form.serialize(), // Serializes form data in standard format
                success : (data) => { 
                    console.log(data);
                },
                dataType : "json", // The format the response should be in
                contentType: "application/x-www-form-urlencoded", // send as JSON
            });

            
            /**fetch(API_URL + 'minutes/', {
                method : 'post',
                headers : {
                    'Accept': 'application/x-www-form-urlencoded',
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                body : action.minute
            }).then( (response) => {
                console.log("data received!");
                console.log("data")
                return state;
            }).catch( (err) => { console.log(err); return state;});*/
            return state;
            break;
        default:
            return state;
    }
}
