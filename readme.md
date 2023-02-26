# Boilerplate - django-react-oauth

This is a boilerplate for a Django app that serves a static React build. It is built to work with Google Cloud SQL, App Engine and Google OAuth.

## Requirements

To use this boilerplate, you will need:

-   Python 3.10 or later
-   Google Cloud SQL instance
-   Google Cloud App Engine
-   Google OAuth
-   Google service account key with sql permissions

## Getting started

I've used a google cloud environment but you can skip it and build it locally or with other cloud provider if you want.

### GCP steps

-   Prepare [cloud sql](https://cloud.google.com/python/django/run#setup-sql) instance. Optionally you can use [cloud sql proxy](https://cloud.google.com/python/django/run#connect_sql_locally) for local development with sql instance running in google cloud.
-   Prepare service account key with sql permissions and put it into `keys/cloud-sql-proxy.json`.
-   Setup OAuth. You can follow [this tutorial](https://pylessons.com/django-google-oauth).

### Locally (.env DEBUG=1 )

1. Copy `.env.example` file and set all env variables. (Note that you will be missing `GAR_URL` till you make first deploy).

```
cp .env.example .env

```

2. Prepare virtualenv for local development and install all requirements.

```
mkvirtualenv django-react-oauth
make sync-all-deps
npm install
```

3. Migrate.

```
python3 manage.py migrate
```

4. Make a build and run locally to test it. This contains a few steps to run in different processes:

-   run sql proxy with: `make connect-sql`. (you might need to set up `GOOGLE_APPLICATION_CREDENTIALS` properly)
-   run webpack in development mode or create a bundle

```
npm start
or
npm run build
```

-   run server with `python3 manage.py runserver`

    At this moment you should be able to see login screen and access `/admin` page.

5. Create a superuser and follow all the steps from OAuth tutorial setting socialaccounts and etc.

    If you have sociall app set you can login to `/admin` using google authentication.

-   visit `http://127.0.0.1:8000/accounts/google/login/`
-   You should see a menu like: _Sign In Via Google. You are about to sign in using a third party account from Google_ . Click: `continue`
-   Login with google prompt.
-   You should be redirected to url specified under `LOGIN_REDIRECT_URL`.

    Now check that user matching your google profile was created. Note that he has not `is_staff=True` so he cannot access admin panel.

## Deployment

1. Adjust `.env` settings in file to match production.
2. Run `make deploy`. This will run all necessary steps to prepare and deploy the app with app engine.

## Usefull resources

-   [Google cloud sql proxy](https://cloud.google.com/python/django/run#connect_sql_locally)
-   [How to setup Google Cloud OAuth with django](https://pylessons.com/django-google-oauth)
