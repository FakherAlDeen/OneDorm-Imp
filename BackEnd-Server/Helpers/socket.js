let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(3001);
    return io;
  },
  get: () => {
    if (!io) {
      throw new Error("socket is not initialized");
    }
    return io;
  }
};