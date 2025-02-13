# Use arm32v7 Node.js image for Raspberry Pi Zero
FROM arm32v7/node:14 as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the React app
RUN npm run build

# Serve the React app with a lightweight server
FROM nginx:alpine

# Copy build files to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80

# Start Nginx to serve the React app
CMD ["nginx", "-g", "daemon off;"]
