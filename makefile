SHORT_SHA := $(shell git rev-parse --short HEAD)


sync-all-deps:
	pip install pip-tools
	pip-compile
	pip-sync requirements.txt --pip-args --no-deps
	pip install -e .[dev]

runserver:
	gunicorn -c gunicorn.conf.py --log-file=- server.wsgi:application

runwebpack:
	npm run dev

build:
	npm run build
	python3 manage.py collectstatic --no-input

lint:
	isort --check-only . 
	flake8 .

lint-fix:
	isort . 
	black .


connect-sql:
	./cloud_sql_proxy -instances="jakub-swajka-personal:europe-west1:jakub-szwajka-sandbox"=tcp:5432


squash-migrations:
	echo 'TO DO: squash migrations to single file representing current db schema'


test-mutant:
	echo 'Initializing session...'
	cosmic-ray init cosmic-ray.conf cosmic-ray-session.sqlite
	echo 'Strating killing mutants 👾'
	cosmic-ray exec cosmic-ray.conf cosmic-ray-session.sqlite

test-mutant-status:
	cr-report cosmic-ray-session.sqlite --show-pending

test-mutant-report:
	cr-html cosmic-ray-session.sqlite > report.html


seed-db:
	python manage.py flush --no-input
	python manage.py loaddata db/seed/auth.json
	python manage.py loaddata db/seed/resources.json
	python manage.py loaddata db/seed/exercises.json
	python manage.py loaddata db/seed/evaluation.json
	python manage.py loaddata db/seed/courses.json
	python manage.py loaddata db/seed/course_step.json


run-for-cypress:
	DJANGO_SETTINGS_MODULE=server.test_settings python manage.py migrate
	DJANGO_SETTINGS_MODULE=server.test_settings make seed-db
	echo '----- prepared for cypress run ----'
	echo '----- starting server -------------'
	DJANGO_SETTINGS_MODULE=server.test_settings python manage.py runserver 0.0.0.0:8000

cypress-open:
	npx cypress open

cypress-run:
	npx cypress run

gcloud-manual-deploy:
	gcloud app deploy app.yaml --version=${SHORT_SHA} --no-cache

gcloud-stream-logs:
	gcloud app logs tail -s default
