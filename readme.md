# Elearning Web App

This project is a web application designed to assist teachers and students in machine learning courses. The app allows teachers to create courses using building blocks, such as exercises and evaluations, and publish them for students to access. 

## Technology Stack

The application is built using the following technologies:

- Django: a web framework for building the backend of the application
- React: a frontend library for building interactive user interfaces
- Google Cloud Platform: a cloud computing platform for deploying the application

## Setting Up Locally

To set up the application locally, follow these steps:

1. Clone the repository to your local machine
2. Install the required dependencies: `make sync-all-deps`
3. Set up a local database using the database settings in `server/settings.py`
4. Run the migrations: `python3 manage.py migrate`
5. Collect the static files: `python3 manage.py collectstatic`
6. Start the development server: `python3 manage.py runserver`

You should now be able to access the application at `http://127.0.0.1:8000`.

## Testing

To run the tests, use the following command:

```
pytest .
```

This will run all the unit tests in the project.

## Contributing

If you want to contribute to the project, please follow these steps:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes and commit them
4. Push your changes to your fork
5. Submit a pull request to the main repository
