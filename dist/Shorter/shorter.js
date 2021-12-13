"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const shortid = require('shortid');
const dSettings = require('../defaultSettings/defaultSettings');
let Shorted = require('../database/index');
const address = `${dSettings.address}:${dSettings.port}/`;
class Shorter {
    register(link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield Shorted.find({ link });
                if (data.length > 0) {
                    return `${address}${data[0].shortid}`;
                }
                else {
                    let id = shortid.generate();
                    const newShorted = new Shorted({ shortid: id, link });
                    newShorted.save();
                    return `${address}${id}`;
                }
            }
            catch (err) {
                return `Error: ${err}`;
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield Shorted.find({ "shortid": id });
                return data[0].link;
            }
            catch (err) {
                return `Error: ${err}`;
            }
        });
    }
}
module.exports = new Shorter;
