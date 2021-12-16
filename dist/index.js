"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App/App"));
const defaultSettings_1 = __importDefault(require("./defaultSettings/defaultSettings"));
App_1.default.listen(defaultSettings_1.default.port, () => {
    console.log("Link Shorter is running.");
});
