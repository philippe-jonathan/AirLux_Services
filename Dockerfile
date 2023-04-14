# Local Services

FROM node:18-alpine as local_app
WORKDIR /usr/app
COPY /localapp/package.json ./
COPY /localapp/package-lock.json ./
RUN npm ci --omit=dev 
CMD [ "node", "index.js" ]

FROM node:18-alpine as pulsor
WORKDIR /usr/app
COPY /pulsor/package.json ./
COPY /pulsor/package-lock.json ./
RUN npm ci --omit=dev 
CMD [ "node", "index.js" ]

# ----------

# Cloud Services

FROM node:18-alpine AS cloud_app-builder
WORKDIR /usr/app
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
COPY tsconfig*.json ./
COPY src .
RUN npm run build

FROM node:18-alpine AS cloud_app-run
ENV NODE_ENV=production
RUN apk add --no-cache tini
WORKDIR /usr/app
RUN chown node:node .
USER node
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /usr/app/lib/ lib/
EXPOSE 3000
ENTRYPOINT [ "/sbin/tini","--", "node", "lib/index.js" ]

# ----------