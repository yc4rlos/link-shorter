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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
const defaultSettings_1 = __importDefault(require("../defaultSettings/defaultSettings"));
const index_1 = __importDefault(require("../database/index"));
const hostAddress = `${defaultSettings_1.default.address}:${defaultSettings_1.default.port}/`;
class Shorter {
    register(link) {
        return __awaiter(this, void 0, void 0, function* () {
            if (link == "") {
                return "";
            }
            try {
                let lastCharacters = link.slice(link.length - 9);
                let idAlreadyRegistered = yield index_1.default.find({ shortid: lastCharacters });
                if (idAlreadyRegistered.length > 0) {
                    return link;
                }
                let data = yield index_1.default.find({ link });
                if (data.length > 0) {
                    return `${hostAddress}${data[0].shortid}`;
                }
                let id = shortid_1.default.generate();
                const newShorted = new index_1.default({ shortid: id, link });
                newShorted.save();
                return `${hostAddress}${id}`;
            }
            catch (err) {
                return `Error: ${err}`;
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield index_1.default.find({ "shortid": id });
                return data[0].link;
            }
            catch (err) {
                return `Error: ${err}`;
            }
        });
    }
}
exports.default = new Shorter;
