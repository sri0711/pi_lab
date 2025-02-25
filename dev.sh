#!/bin/bash

echo "Development server is starting..."

# Start the Node.js server in the background
cd ./server
npm run dev &  # Run Node.js in background
NODE_PID=$!
echo "Node.js server started with PID $NODE_PID"

# Wait for Node.js to be fully running (checking the server's log or output)
echo "Waiting for Node.js server to be ready..."
while ! nc -z localhost 3001; do   # Check if port 3000 is open (adjust if needed)
  sleep 1
done
echo "Node.js server is up and running!"

# Start the React client in the background
cd ../client
npm run start &  # Run React in background
CLIENT_PID=$!
echo "React client started with PID $CLIENT_PID"

# Wait for React to be fully running (checking if port 3000 or other is open)
echo "Waiting for React client to be ready..."
while ! nc -z localhost 3000; do   # You may need to change the port number
  sleep 1
done
echo "React client is up and running!"

# Now, start the Python service
cd ../service
source pi_lab_env/bin/activate
python app.py &  # Run Python service in background
PYTHON_PID=$!
echo "Python service started with PID $PYTHON_PID"

# Wait for all processes to finish
wait $NODE_PID
wait $CLIENT_PID
wait $PYTHON_PID

echo "All services have started."
