import socketio # type: ignore
import subprocess

# Connect to the server
sio = socketio.Client()

# Event: when the client successfully connects to the server
@sio.event
def connect():
    print('Connected to server')

# Event: when the server sends a message to the client
@sio.event
def message(data):
    
    # Ensure that the data is passed as a list
    try:
        # Split the command into a list and execute it
        command = data.split()
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        
        # Capture the standard output and send it back to the server
        output = process.stdout.read()
        sio.emit('message', output.strip())  # Emit back to server
        
        # Capture error output, if any
        stderr_output = process.stderr.read()
        if stderr_output:
            sio.emit('message', stderr_output.strip())  # Send error output back to server
        
        # Wait for the process to complete
        process.wait()

    except Exception as e:
        print(f"Error while spawning process: {e}")
        sio.emit('message', f"Error: {e}")

# Event: when the client disconnects from the server
@sio.event
def disconnect():
    print('Disconnected from server')

# Connect to the Socket.IO server
sio.connect('http://localhost:3001')

# Wait for events (this is a blocking call that listens for events from the server)
sio.wait()
