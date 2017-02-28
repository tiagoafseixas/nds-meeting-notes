"use strict";

//from 23:55:00 to the stored time
//storedTime = hours * 3600 + minutes * 60 + seconds

//from the stored time to 23:55:00
//hours = storedTime / 3600  // needs to be an integer division
//leaves = storedTime - hours * 3600
//minutes = leaves / 60
//seconds = leaves - 60 * minutes

var mongoose = require('mongoose');

var agendaSchema = new mongoose.Schema({
    order : Number,
    description : String,
    important : Boolean,
    complete : Boolean
});

var todoSchema = new mongoose.Schema({
    description : String,
    complete: Boolean
});

var personSchema = new mongoose.Schema({
    name : String,
    attended : Boolean,
    externalSystem : String,
    externalSystemId: String
});

var minuteSchema = new mongoose.Schema({
    title: String,
    date : Date,
    time : Number,
    minute : String,
    conclusions : String,
    agenda : [agendaSchema],
    invited : [personSchema],
    todos : [todoSchema]
});

module.exports = mongoose.model('Minute', minuteSchema);