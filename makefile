

pip-compile:
	pip-compile --generate-hashes --no-emit-index-url

sync-all-deps:
	pip-sync requirements.txt --pip-args --no-deps
	pip install --no-deps -e .