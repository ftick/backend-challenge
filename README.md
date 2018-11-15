# Ark Paradigm Technical Challenge
Your task is to build an Express.js server that uses the socket.io library for communicating events to the client.

## Info

## Endpoints
- /data/update
    - Updates server's data.txt file with contents of the request's JSON payload. The resulting file must be valid JSON.
- /data/:key
    - Return value associated with given key from JSON file. If it does not exist return an appropriate error.

## Socket.io
- Server updates all clients listening on the 'update' channel whenever someone adds data to the JSON file. The message should include the new data

## TODO

### /data/update POST endpoint
- [ ] Write how-to and add to README
- [ ] Create test suite for endpoint
- [ ] Implement functionality
- [ ] Implement input validation
- [ ] Implement proper error handling

### /data/:key GET endpoint
- [ ] Write how-to and add to README
- [ ] Create test suite for endpoint
- [ ] Implement functionality
- [ ] Implement input validation
- [ ] Implement proper error handling

### Socket.io stuff
- [ ] Add info about Socket server/clients to README
- [ ] Create test suite for Socket server
- [ ] Create test suite for Socket clients
- [ ] Hook up Socket.io
