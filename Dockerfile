# 1. Use official Node.js image
FROM node:18-alpine


# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install deps
COPY package*.json ./
RUN npm install


# 4. Copy the rest of the project
COPY . .

# 5. Build the Next.js app
RUN npm run build

# 6. Expose the port
EXPOSE 3000

# 7. Start the app
CMD ["npm", "start"]
