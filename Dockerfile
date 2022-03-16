# Install dependencies and build solution
FROM node:alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production image, copy all the files and run next
FROM node:alpine AS runner
LABEL maintainer="cfryerdev@gmail.com"
WORKDIR /app

# Add the user and ensure the process runs as this user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S appUser -u 1001
COPY --from=builder /app/. .
USER appUser

# Set the env var for the service and open port 80
ENV PORT=80
EXPOSE 80

CMD ["npm", "start"]