# Install dependencies only when needed
FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install

# Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM node:alpine AS runner
LABEL maintainer="cfryerdev@gmail.com"
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/. .

ENV PORT=80

USER nextjs

EXPOSE 80

CMD ["npm", "start"]