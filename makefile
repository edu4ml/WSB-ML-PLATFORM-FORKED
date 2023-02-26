SHORT_SHA := $(shell git rev-parse --short HEAD)


sync-all-deps:
	pip-sync requirements.txt --pip-args --no-deps
	pip install -e .[dev]

runserver:
	gunicorn -c gunicorn.conf.py --log-file=- server.wsgi:application

runwebpack:
	npm run dev

deploy:
	npm run build
	python3 manage.py collectstatic
	pip-compile
	gcloud app deploy app.yaml --version=${SHORT_SHA} --no-cache

lint:
	isort --check-only . 
	flake8 .

lint-fix:
	isort . 
	black .