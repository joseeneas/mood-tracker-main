FROM node:hydrogen-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./

COPY apps/frontend/package.json ./apps/frontend/

RUN mkdir -p /publish/apps/frontend && \
		pnpm install --frozen-lockfile && \
    cp -R node_modules /publish/ && \
    cp -R apps/frontend/node_modules /publish/apps/frontend/

COPY ./apps ./apps/

ARG STATIC_API_KEY

WORKDIR /app/apps/frontend

RUN pnpm build && \
    mv .next /publish/apps/frontend/ &&\
    cp -R public /publish/apps/frontend/

FROM node:hydrogen-alpine

COPY --from=builder /publish /app

WORKDIR /app/apps/frontend

ARG STATIC_API_KEY
ENV STATIC_API_KEY=$STATIC_API_KEY

RUN npx next telemetry disable

EXPOSE 3000

CMD ["node_modules/.bin/next", "start", "-p", "3000"]
