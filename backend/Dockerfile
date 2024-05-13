# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.18.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production
ENV PORT=4000
ENV MONGODB_URL="mongodb+srv://tijotjoseph:4CHkgnaHODjH0RIR@loyaltycarddb.3o6xb60.mongodb.net/ticket_db"
ENV JWT_SECRET="QVXxot9A5oCOXsY"
ENV AWS_REGION="ap-south-1"
ENV AWS_ACCESS_KEY="AKIAUQ2PXSHKH5ZODZJT"
ENV AWS_SECRET_ACCESS_KEY="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"
ENV AWS_BUCKET_NAME="image-upload-oxium/tickets"
ENV EMAIL_ID="spptacute@gmail.com"
ENV PASSWORD="vkew dimh egai gszi"


WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
CMD npm start
