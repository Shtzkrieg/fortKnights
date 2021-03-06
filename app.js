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
const feathers_1 = __importDefault(require("@feathersjs/feathers"));
require("@feathersjs/transport-commons");
const express_1 = __importDefault(require("@feathersjs/express"));
const socketio_1 = __importDefault(require("@feathersjs/socketio"));
const fnData_1 = require("./fnData");
// A messages service that allows to create new
// and return all existing messages
class MessageService {
    constructor() {
        this.messages = [];
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            // Just return all our messages
            return this.messages;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // The new message is the data text with a unique identifier added
            // using the messages length since it changes whenever we add one
            const message = {
                id: this.messages.length,
                round: data.round
            };
            // Add new message to the list
            this.messages.push(message);
            return message;
        });
    }
}
// Creates an ExpressJS compatible Feathers application
const app = (0, express_1.default)((0, feathers_1.default)());
// Express middleware to parse HTTP JSON bodies
app.use(express_1.default.json());
// Express middleware to parse URL-encoded params
app.use(express_1.default.urlencoded({ extended: true }));
// Express middleware to to host static files from the current folder
app.use(express_1.default.static(__dirname));
// Add REST API support
app.configure(express_1.default.rest());
// Configure Socket.io real-time APIs
app.configure((0, socketio_1.default)());
// Register our messages service
app.use('/messages', new MessageService());
// Express middleware with a nicer error handler
app.use(express_1.default.errorHandler());
// Add any new real-time connection to the `everybody` channel
app.on('connection', connection => app.channel('everybody').join(connection));
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));
// Start the server
app.listen(3030).on('listening', () => console.log('Feathers server listening on localhost:3030'));
// For good measure let's create a message
// So our API doesn't look so empty
// export type MatchRecord = 
//         | {Result: Result, Path: Path, Kills: number}
let result = fnData_1.fnData.Result.Dub;
let path = [fnData_1.fnData.NamedLocation.Condo_Canyon, fnData_1.fnData.NamedLocation.Sleepy_Sound];
let kills = 12;
app.service('messages').create({
    round: { result, path, kills }
});
{
    let result = fnData_1.fnData.Result.Dub;
    let path = [fnData_1.fnData.NamedLocation.Condo_Canyon, fnData_1.fnData.NamedLocation.Sleepy_Sound, fnData_1.fnData.NamedLocation.Condo_Canyon, fnData_1.fnData.NamedLocation.Chonkers_Speedway];
    let kills = 1;
    app.service('messages').create({
        round: { result, path, kills }
    });
}
