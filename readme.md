# Boilerplate - django-react-oauth

This repo should contain a starting point for any django app serving static react frontend with google oauth

- **server** folder contains the whole backend service written with django.
- **app** contains react app based on [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)

## How to run it

1. Install requirements

```
    make sync-all-deps
```

2. Run migrations

```
    make migrate
```

3. Create superuser

```
    python manage.py createsuperuser
```

## How to setup Google OAuth

For step by step tutorail you can go [here](https://pylessons.com/django-google-oauth)

## Login to django

1. Go to `http://127.0.0.1:8000/accounts/google/login/`
2. You should see a menu like: _Sign In Via Google. You are about to sign in using a third party account from Google_ . Click: `continue`
3. Login with google prompt.
4. You should be redirected to url specified under `LOGIN_REDIRECT_URL`.

- check that profile was created under: SocialAccounts.SocialAccounts
- check that user model instance was created
