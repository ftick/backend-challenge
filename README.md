# Ark Paradigm Technical Challenge
Your task is to build an Express.js server that uses the socket.io library for communicating events to the client.

## Info

## Endpoints
- /data/update
    - Updates server's data.txt file with contents of the request's JSON payload. The resulting file must be valid JSON.
- /data/:key
    - Returns the value associated with the given key from JSON file.
    - Returns an appropriate error if it does not exist.

## Socket.io
- Server updates all clients listening on the 'update' channel whenever someone adds data to the JSON file. The message includes the new data.

## TODO

### /api/update
- [ ] Write how-to and add to README
- [ ] Create test suite for endpoint
- [x] <s>Implement functionality</s>
- [x] <s>Implement input validation</s>
- [x] <s>Implement proper error handling</s>

### /api/:key
- [ ] Write how-to and add to README
- [ ] Create test suite for endpoint
- [x] <s>Implement functionality</s>
- [x] <s>Implement input validation</s>
- [x] <s>Implement proper error handling</s>

### Socket.io
- [ ] Add info about Socket server/clients to README
- [ ] Create test suite for Socket server
- [ ] Create test suite for Socket clients
- [ ] Hook up Socket.io
