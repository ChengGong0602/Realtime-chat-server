# Realtime socket server



## Create database with knex library
```
npx knex init  
npx knex migrate    
npx knex migrate:make create-users    
npx knex migrate:latest    
```
Note if the database does not exist, this command will auto generate one.   
```
npx knex seed:make 001-users    
npx knex seed:run    
```

## Run server 

```
npm install 
npm start
```