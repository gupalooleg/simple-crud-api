# simple-crud-api

Simple CRUD API is application that performs CRUD operations according to [requirements](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/simple-crud-api.md).

This application was implemented as part of the course [NodeJS 2021Q4](https://rs.school/nodejs/).

## Installation and launch

1. Clone the repository branch: `git clone https://github.com/gupalooleg/simple-crud-api.git`.
2. Go to the application directory: `cd simple-crud-api`.
3. Change branch: `git checkout develop`.
4. Install dependencies" `npm i`.
5. Run the application: `npm run start:dev`.

## Usage

The application is a web server that performs CRUD operations on the "person" entity.

> Note: The application supports only the following HTTP methods: GET, POST, PUT, DELETE.

> Note: The application supports only the Content-type: application/json.

> Note: File .env contains application settings: PORT...

### Examples

- GET

```
fetch('http://localhost:8000/person',
{
    method: 'GET'
})
```

- POST

```
fetch('http://localhost:8000/person',
{
  method: 'POST',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({"name":"Ivan","age":30,"hobbies":["h1", "h2"]})
})
```

- PUT

```
fetch('http://localhost:8000/person/<ID>',
{
  method: 'PUT',
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  body: JSON.stringify({"name":"Ivan","age":40,"hobbies":["h2"]})
})
```

- DELETE

```
fetch('http://localhost:8000/person/<ID>',
{
  method: 'DELETE'
})
```
