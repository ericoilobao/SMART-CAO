FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build contracts
RUN npm run compile

# Expose port
EXPOSE 8545

# Start Hardhat node
CMD ["npx", "hardhat", "node"]
