SHORT_SHA := $(shell git rev-parse --short HEAD)

compile:
	pip-compile

sync-all-deps:
	pip-sync requirements.txt --pip-args --no-deps
	pip install -e .[dev]

migrate: 
	python3 django_react_oauth migrate


run-gunicorn:
	gunicorn -c gunicorn.conf.py --log-file=- server.wsgi:application


deploy:
	pip-compile
	gcloud app deploy app.yaml --version=${SHORT_SHA} --no-cache