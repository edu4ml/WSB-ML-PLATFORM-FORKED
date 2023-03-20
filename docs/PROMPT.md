
# GPT Prompts 

This doc holds the useful prompts for chat gpt to work with while using this project. Adding technology and domain context. 


To check the prompt you can add:

> "{propmpt}". Break down the prompt above into contextual relevance


It is advice to start conversation with context before asking any questions

## Context 

```
"An e-learning web application is being developed to assist teachers and students with machine learning courses. Teachers can create and publish courses using building blocks (course components), which currently include two types: exercises and evaluations. Exercises are comprised of resources with links, while evaluations involve students submitting files summarizing their work from previous chapters. The course structure consists of an organized order of external resources and evaluation steps.

The web application utilizes a Django backend with a React frontend, and it is deployed on Google Cloud Platform. The project follows the Domain-Driven Design approach and has a repository structure that includes frontend, API, db, docs, elearning, infra, server, shared, and staticfiles-cdn directories. The frontend directory contains a Django app serving a React webpack bundle, while the API directory hosts Django Rest Framework definitions for handling requests and interacting with the app. The db directory houses Django models, migrations, repository definitions, and initial development data. The elearning directory contains the core logic of the application, with domain entities, aggregates, and command handlers. The infra directory stores infrastructure code for commands, events, and other general logic. The server directory manages Django app configurations, settings, and URL routing. The shared directory maintains constant values synchronized between the frontend and backend."
```
