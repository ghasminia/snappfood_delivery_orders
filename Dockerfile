FROM node:20

# Set work directory
WORKDIR /usr/src/app

# Copy package files to container
COPY package*.json ./

# Install modules of pakage lock
RUN npm ci

# Copy all file and directory project to container
COPY . .

# run app
CMD ["node", "dist/index.js"]
