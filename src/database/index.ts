import mongoose from 'mongoose';
import Logger from '../helper/Logger';
import { db } from '../config';

// Build the connection string

// for Local DB

// const dbURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/${
//   db.name
// }`;

// For Hosted DB
const dbURI = `mongodb+srv://${db.user}:${encodeURIComponent(db.password)}@${db.host}/${
  db.name
}?retryWrites=true&w=majority`;


const options = {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
  autoIndex: true,
  // poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};


// Create the database connection
mongoose
  .connect(dbURI, options)
  .then(() => {
    Logger.info('Mongoose connection done');
  })
  .catch((e) => {
    Logger.info('Mongoose connection error');
    Logger.error(e);
  });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  Logger.info('Mongoose  connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  Logger.error('Mongoose  connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  Logger.info('Mongoose  connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    Logger.info('Mongoose  connection disconnected through app termination');
    process.exit(0);
  });
});
