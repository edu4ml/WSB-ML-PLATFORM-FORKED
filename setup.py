from setuptools import find_packages, setup


project = "django-react-oauth"
version = "0.1.0"

setup(
    name=project,
    version=version,
    description="django-react-oauth",
    author="Jakub Szwajka",
    author_email="szwajkajakub@gmail.com",
    packages=find_packages(exclude=["*.tests", "*.tests.*", "tests.*", "tests"]),
    include_package_data=True,
    install_requires=[
        "Django==4.1.7",
        "django-webpack-loader==1.8.1",
        "djangorestframework==3.14.0",
        "djangorestframework_jwt",
        "djangorestframework_simplejwt==5.2.2",
        "dj_rest_auth==3.0.0",
        "django-allauth",
        "gunicorn==20.1.0",
        "python-dotenv==1.0.0",
        "psycopg2==2.9.5",
        "pydantic==1.10.5",
    ],
    extras_require={
        "DEV": [
            "flake8",
            "isort",
            "black",
            "pytest-cov",
            "cosmic-ray",
            "pytest-django==4.5.2",
            "mock==5.0.1",
            "model_bakery==1.10.1",
        ]
    },
    scripts=[],
)
