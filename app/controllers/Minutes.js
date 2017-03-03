"use strict";

var Immutable = require('immutable');
var _ = require('lodash');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017');

var Minute = require('../models/Minutes');

function convertMapToMinuteModel(map = Immutable.Map())
{
    let minute = new Minute();
    minute.title = map.get("title");
    minute.date = new Date(map.get("date"));
    minute.minute = map.get("minute");
    minute.conclusions = map.get("conclusions");
    
    let timeArray = map.get("time").split(':');
    minute.time = timeArray[0]*3600 + timeArray[1]*60;

    let agendaDescription = _.compact(_.concat([], map.get("agendaDescription")));
    let agendaCompleted = _.compact(_.concat([], map.get("agendaItemCompleted")));
    minute.agenda = agendaDescription.map(
        (v, i) => { return { description : v, complete : agendaCompleted[i] } }
    );

    let invitedName = _.compact(_.concat([], map.get("invitedName")));
    let invitedAttended = _.compact(_.concat([], map.get("invitedItemAttended")));
    minute.invited = invitedName.map(
        (v, i) => { return { name : v, attended : invitedAttended[i] } }
    );

    let todoDescription = _.compact(_.concat([], map.get("todoDescription")));
    let todoCompleted = _.compact(_.concat([], map.get("todoItemCompleted")));
    minute.todos = todoDescription.map(
        (v, i) => { return { description : v, complete : todoCompleted[i] } }
    );

    return minute;
}

/**
 * exports.post - inserts a new meeting minute in the database.
 * 
 * @todo: rever a questão dos compacts e concats. podia e devia estar em algum
 *        tipo de middleware.
 */
exports.post = (map, callback) => {
    console.log(">controller.minutes -> post");
    let minute = convertMapToMinuteModel(map);
    minute.save((err) => { (err) ? callback({err}) : callback(null, {id: minute._id}) });
};

exports.get = (filter = {}) => {
    console.log(">controller.minutes -> get");
    console.log(filter);
    /**
     * @todo: filter is not working! it should be targeted to functionality and 
     *        not generic.
     */
    return Minute
        .find(filter)
        .limit(20)
        .sort({_id : -1})
        .exec( (err, minutes) => {
            if (err) console.log(err);
            console.log(minutes);
            return minutes;
        } );
};

exports.delete = (id, callback) => {
    console.log(">controller.minutes -> delete");
    return Minute.findByIdAndRemove(
        id,
        (err, minute) => { 
            (err) ? callback(err) : callback(err, (minute) ? minute._id : '')
        }
    );
};

exports.update = (map = Immutable.Map({}), callback) => {
    console.log(">controller.minutes -> update");
    let minute = convertMapToMinuteModel(map);
    minute.save((err) => { (err) ? callback({err}) : callback(null, {id: minute._id}) });
};