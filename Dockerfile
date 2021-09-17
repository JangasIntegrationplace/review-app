FROM node:13.12.0-alpine as build_fe

COPY app/react_frontend frontend/
RUN cd frontend/ && npm install && npm run build


# No Alpine image in use.
# This Project uses packages which are not compatible to alpine
# e.g. pandas and tensorflow
FROM python:3.9 as prod

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# WAITER
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait


# Django
COPY ./app /app/
COPY --from=build_fe /frontend/build /app/react_frontend/build

RUN echo ls /app/react_frontend

RUN pip install --upgrade pip \
    && pip install -r app/requirements.txt

WORKDIR /app/
