run_gunicorn := gunicorn -c gunicorn.conf.py --threads 4 server.wsgi:application


pip-compile:
	pip-compile --generate-hashes --no-emit-index-url

sync-all-deps:
	pip-sync requirements.txt --pip-args --no-deps
	pip install --no-deps -e .

migrate: 
	python3 django_react_oauth migrate


run-gunicorn:
	${run_gunicorn}