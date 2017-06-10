Untuk mencobanya ada perlu menginstall [Nodejs](https://nodejs.org/en/)

### API
buka terminal CLI
~~~~
cd api
npm install
npm start
~~~~

API berjalan di ````http://localhost:8000/````

untuk menampilkan semua data orang: ````http://localhost:8000/people````
untuk menampilkan spesifik data orang: ````http://localhost:8000/people/1````,````http://localhost:8000/people/2````,````http://localhost:8000/people/3````,````http://localhost:8000/people/4````

### SERVER
~~~~
cd server
npm install
npm start
~~~~

SERVER berjalan di ````http://localhost:5000/````
GraphiQL dapat diakses di ````http://localhost:5000/graphiql````

untuk mencobanya silakan masukkan query berikut:
~~~~
query{
  allPeople{
    username
    email
    firstName
    lastName
    friends{
      username
      email
    }
}
~~~~

atau untuk menampilkan spesifik data silakan masukkan query berikut:
~~~~
query{
  person(id:"1"){
    username
    email
    firstName
    lastName
    friends{
      username
      email
    }
}
~~~~
