FROM node:20-alpine AS builder

# Set the working directory to /app inside the container
WORKDIR /app

# COPY app files
COPY . .

# Install dependencies
RUN rm -f package-lock.json && npm install

ARG BASE_URL
ENV VITE_API_BASE_URL=${BASE_URL}
ARG SURVEY_CREATOR_LICENSE_KEY
ENV VITE_SURVEY_CREATOR_LICENSE_KEY=${SURVEY_CREATOR_LICENSE_KEY}
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false

# Build the app
RUN npm run build

# Bundle static assets with ngnix
FROM nginx:1.21.0-alpine AS production

# Copy built assets from `builder` image
COPY --from=builder /app/dist /usr/share/nginx/html

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
