# build environment
FROM python:3.8-alpine as build
WORKDIR /app
COPY ./requirements.txt /app/requirements.txt
RUN apk add --update --no-cache --virtual .tmp-build-deps \
        gcc libc-dev linux-headers
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN apk del .tmp-build-deps
COPY . /app/

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
