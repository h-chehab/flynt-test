# Report

## Installation 

I had to modify the Makefile ( line 9 ) in order to run docker compose with the new version of docker.
New syntax for docker compose is:
```bash
docker compose up
```

instead of:
```bash
docker-compose up
```


## Test 

If possible separate variable instantiation ( I would place it at the beginning of the component function ), from components methods


## Front-end bug
Front end bug is resolved by:

1. Creating a new method within ```IngredientPage``` and pass it to the child component ```CreateIngredientForm``` in order to be used when a new ingredient is created. <br /><br />
2. Call refetch function provided by the hook useQuery in the method created in step 1.








