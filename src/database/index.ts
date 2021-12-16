import defaultSettings from '../defaultSettings/defaultSettings';
import mongoose from 'mongoose';

mongoose.connect("mongodb://" + defaultSettings.DataBaseIP).catch((err: string) => {
    console.log("Database connect was refused. Error: " + err);
});

const model = new mongoose.Schema({
    shortid: String,
    link: String
});

const shortedModel = mongoose.model("shorted", model);

export default shortedModel;