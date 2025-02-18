# client.py (Python Socket.io Client)
import socketio

# Connect to the server
sio = socketio.Client()

# Event: when the client successfully connects to the server
@sio.event
def connect():
    print('Connected to server')

# Event: when the server sends a message to the client
@sio.event
def message(data):
    print(f"Message from server: {data}")

# Event: when the client disconnects from the server
@sio.event
def disconnect():
    print('Disconnected from server')

# Connect to the server running on localhost:3000
sio.connect('http://localhost:3001')

# Send a message to the server
sio.send('Hello from Python client')

# Wait for server messages (this will keep the program running)
sio.wait()
