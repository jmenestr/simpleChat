FROM node:9

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
RUN yarn global add typescript
RUN yarn global add webpack

COPY package.json /app/
COPY tsconfig.json /app/
COPY webpack.config.js /app
COPY index.html /app
RUN yarn install

# Copy app source
COPY src /app/src

# Compile app sources
RUN yarn build:ts:prod
RUN yarn build:bundle:prod

# Remove dev dependencies
RUN yarn install --production
RUN rm -rf ./src

# Expose port and CMD
EXPOSE 3000
CMD [ "yarn", "server" ]
