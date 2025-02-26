import socketio  # type: ignore
import subprocess
import os
import pty
import time

# Connect to the server
sio = socketio.Client()

# Event: when the client successfully connects to the server
@sio.event
def connect():
    print('Connected to server')

# Event: when the server sends a message to the client
@sio.event
def message(data):
    try:
        print('Got message:', data)
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

# Event: when the server needs full access to the system terminal
@sio.event
def terminalExecute(data):
    try:
        print("Executing terminal command:", data)
        
        # Create a pseudo-terminal (PTY)
        master_fd, slave_fd = pty.openpty()

        # Spawn the terminal (bash) process
        pid = os.fork()

        if pid == 0:  # Child process: Run the terminal process (bash)
            os.execvp('bash', ['bash'])
        else:  # Parent process: Handle the communication with the terminal
            os.set_inheritable(master_fd, True)
            os.set_inheritable(slave_fd, True)

            # Read and write from PTY in non-blocking manner
            while True:
                # Check if the connection is still alive
                if sio.connected:
                    # Read input from the WebSocket (from the frontend)
                    if data:
                        os.write(master_fd, data.encode())

                # Read terminal output from PTY
                output = os.read(master_fd, 1024)
                if output:
                    # Send terminal output back to the WebSocket
                    sio.emit('terminal_process', output.decode())

                # Add a small delay to avoid overwhelming the CPU
                time.sleep(0.1)

    except FileNotFoundError as e:
        # Handle case where the command was not found
        error_message = f"Error: Command not found - {e}"
        sio.emit('terminal_process', error_message)

    except Exception as e:
        # Generic error handling for any other issues
        error_message = f"Error while executing command: {e}"
        sio.emit('terminal_process', error_message)

# Event: when the client disconnects from the server
@sio.event
def disconnect():
    print('Disconnected from server')

# Connect to the Socket.IO server
sio.connect('http://localhost:3001')

# Wait for events (this is a blocking call that listens for events from the server)
sio.wait()
