# syntax=docker/dockerfile:1.4

# Build stage
FROM node:lts AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Production stage
FROM node:lts AS production

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./build


ENV VITE_API_BASE_URL=''
EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]