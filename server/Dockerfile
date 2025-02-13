# Use arm32v7 Node.js image for Raspberry Pi Zero
FROM arm32v7/node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 3001

# Start the server
CMD ["npm", "start"]