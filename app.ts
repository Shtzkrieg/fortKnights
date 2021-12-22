import feathers from '@feathersjs/feathers';
import '@feathersjs/transport-commons';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import { fnData } from './fnData';

// This is the interface for the message data
interface Message {
  id: number;
  round: fnData.MatchRecord;
}

// A messages service that allows to create new
// and return all existing messages
class MessageService {
  messages: Message[] = [];

  async find () {
    // Just return all our messages
    return this.messages;
  }

  async create (data: Pick<Message, 'round'>) {
    // The new message is the data text with a unique identifier added
    // using the messages length since it changes whenever we add one
    const message: Message = {
      id: this.messages.length,
      round: data.round
    } as const;

    // Add new message to the list
    this.messages.push(message);

    return message;
  }
}

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Express middleware to parse HTTP JSON bodies
app.use(express.json());
// Express middleware to parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Express middleware to to host static files from the current folder
app.use(express.static(__dirname));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register our messages service
app.use('/messages', new MessageService());
// Express middleware with a nicer error handler
app.use(express.errorHandler());

// Add any new real-time connection to the `everybody` channel
app.on('connection', connection =>
  app.channel('everybody').join(connection)
);
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));

// Start the server
app.listen(3030).on('listening', () =>
  console.log('Feathers server listening on localhost:3030')
);

// For good measure let's create a message
// So our API doesn't look so empty
// export type MatchRecord = 
//         | {Result: Result, Path: Path, Kills: number}
let result = fnData.Result.Dub
let path = [fnData.NamedLocation.Condo_Canyon, fnData.NamedLocation.Sleepy_Sound]
let kills = 12

app.service('messages').create(
    {
    round: {result, path, kills}
});

{
    let result = fnData.Result.Dub
    let path = [fnData.NamedLocation.Condo_Canyon, fnData.NamedLocation.Sleepy_Sound, fnData.NamedLocation.Condo_Canyon, fnData.NamedLocation.Chonkers_Speedway]
    let kills = 1
    app.service('messages').create({
        round: {result, path, kills}
    })
}