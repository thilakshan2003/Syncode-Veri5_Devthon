FROM node:20-alpine

WORKDIR /app

# Install deps first (better caching)
COPY backend/package*.json ./
COPY prisma ./prisma/
RUN npm ci

RUN npx prisma generate


# Copy backend source
COPY backend/ ./

EXPOSE 5000

CMD ["npm", "start"]