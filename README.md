
# Contact Management

This is a contact management system built with Node.js and Express.
It allows users to manage contacts by providing functionalities to add, update, delete,
and retrieve contact information with authentication using JWT.


Install dependencies
```bash
npm install 
```



## API Reference

### User route

Register User
```http
  POST /api/users/register
```
Login User
```http
  POST /api/users/Login
```
Current User Information
```http
  GET /api/users/current
```

### Contact route: 

Create new Contact 
```http
  POST /api/contact/
```

Get Contact 
```http
  GET /api/contact/
```
Get single Contact 
```http
  GET /api/contact/:id
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` |  id of contact |

Update Contact 
```http
  PUT /api/contact/:id
```

Delete Contact 
```http
  DELETE /api/contact/:id
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

mongodb:  `CONNECTION_STRING` 

bcrypt : `ACCESS_TOKEN_SECRET`

