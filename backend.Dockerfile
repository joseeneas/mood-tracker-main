FROM node:hydrogen-alpine AS builder

ENV PATH=./node_modules/.bin:$PATH

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

COPY apps/backend/package.json ./apps/backend/

RUN mkdir -p /publish/apps/backend && \
		pnpm install --frozen-lockfile && \
		cp -R node_modules /publish/ && \
    cp -R apps/backend/node_modules /publish/apps/backend/

COPY ./apps ./apps/

WORKDIR /app/apps/backend

RUN apk add --no-cache rsync
RUN rsync -a . /publish/apps/backend --exclude node_modules

FROM node:hydrogen-alpine

COPY --from=builder /publish /app

WORKDIR /app/apps/backend

ENV NODE_ENV=production

EXPOSE 1847

CMD ["node", "src/server.js"]