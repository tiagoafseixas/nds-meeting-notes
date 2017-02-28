"use strict";

var Immutable = require('immutable');

var mongoose = require('mongoose');
mongoose.connect('localhost:27017');
mongoose.Promise = global.Promise;

var Minute = require('../models/Minutes');

exports.post = (req, res, next) => {
    console.log(">controller.minutes -> post");

    let body = Immutable.Map(req.body);
    let minute = new Minute();
    minute.title = body.get("title");
    minute.date = new Date(body.get("date"));
    minute.minute = body.get("minute");
    minute.conclusions = body.get("conclusions");
    
    let timeInSeconds = 0;
    let timeArray = body.get("time").split(':');

    if(timeArray.length > 1) {
        timeInSeconds = timeArray[0]*3600 + timeArray[1]*60;
    }

    minute.time = timeInSeconds;

    if(body.get("agendaDescription").map) {
        minute.agenda = body.get("agendaDescription").map(
            (value, index) => {
                return {
                    description : value,
                    completed : body.get("agendaItemCompleted")[index]
                }
            }
        );
    }

    if (body.get("invitedName").map) {
        minute.invited = body.get("invitedName").map(
            (value, index) => {
                return {
                    name : value,
                    attended : body.get("invitedItemAttended")[index]
                }
            }
        );
    }

    if (body.get("todoDescription").map) {
        minute.todos = body.get("todoDescription").map(
            (value, index) => {
                return {
                    description : value,
                    completed : body.get("todoItemCompleted")[index]
                }
            }
        );
    }

    minute.save((err, id) => {
        if(err) {
            console.log(err);
        }
        return id;
    });

    console.log("<controller.minutes -> post");
};

exports.get = (req, res, next) => {
    console.log(">controller.minutes -> get");
    
    return Minute
        .find()
        .limit(20)
        .sort({_id : -1})
        .exec( (err, minutes) => {
            if (err) console.log(err);
            console.log(minutes);
            return minutes;
        } );
    console.log("<controller.minutes -> get");
};