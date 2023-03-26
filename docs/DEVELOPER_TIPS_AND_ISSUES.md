

# Clean database 

During development I found that it is quite usefull to make a db drop (clear all tables) and rerun migrations. 

"how to" found here: https://stackoverflow.com/questions/3327312/how-can-i-drop-all-the-tables-in-a-postgresql-database

This part is crucial 
```
-- Recreate the schema
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Restore default permissions
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```




# Google Login in WSB platform 

Useful resources: 
- https://www.hacksoft.io/blog/google-oauth2-with-django-react-part-1