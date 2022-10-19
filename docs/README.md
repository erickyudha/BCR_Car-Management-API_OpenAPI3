# BCR - Car Management API (OpenAPI 3.0)

> Version 1.0

API to manage Binar Car Rental service website. This API is a part of fullstack development course individual project by Binar Academy. 

 User is divided into three roles: superadmin, admin, member 

 Superadmin default account details can be found on this project [repository](https://github.com/erickyudha/bcr_car-management-api) documentation. Superadmin account details can also be modified by following the instruction there.

## Path Table

| Method | Path | Description |
| --- | --- | --- |
| POST | [/register](#postregister) | Register new member |
| POST | [/login](#postlogin) | Login with account |
| GET | [/whoami](#getwhoami) | Get current user data |
| GET | [/users](#getusers) | Get current registered users |
| POST | [/admins](#postadmins) | Add new admin |
| POST | [/images](#postimages) | Upload image to server |
| GET | [/images/{imageId}](#getimagesimageid) | Get image data by ID |
| DELETE | [/images/{imageId}](#deleteimagesimageid) | Delete image from server by ID |
| GET | [/cars](#getcars) | Get car list |
| POST | [/cars](#postcars) | Add new car data |
| GET | [/cars/{carId}](#getcarscarid) | Get car data by ID |
| PUT | [/cars/{carId}](#putcarscarid) | Edit car data by ID |
| DELETE | [/cars/{carId}](#deletecarscarid) | Delete car data by ID |
| GET | [/archive/cars](#getarchivecars) | Get archived car data list |
| GET | [/archive/cars/{carId}](#getarchivecarscarid) | Get archived car data by ID |
| DELETE | [/archive/cars/{carId}](#deletearchivecarscarid) | Destroy archived car data by ID |
| GET | [/archive/cars/{carId}/restore](#getarchivecarscaridrestore) | Restore archived car data by ID |

## Reference Table

| Name | Path | Description |
| --- | --- | --- |
| bearerAuth | [#/components/securitySchemes/bearerAuth](#componentssecurityschemesbearerauth) |  |
| DefaultErrMsg | [#/components/schemas/DefaultErrMsg](#componentsschemasdefaulterrmsg) |  |
| UnauthorizedMsg | [#/components/schemas/UnauthorizedMsg](#componentsschemasunauthorizedmsg) |  |
| MissingFieldMsg | [#/components/schemas/MissingFieldMsg](#componentsschemasmissingfieldmsg) |  |
| InvalidParamMsg | [#/components/schemas/InvalidParamMsg](#componentsschemasinvalidparammsg) |  |
| Image | [#/components/schemas/Image](#componentsschemasimage) |  |
| CarRequest | [#/components/schemas/CarRequest](#componentsschemascarrequest) |  |
| CarResponse | [#/components/schemas/CarResponse](#componentsschemascarresponse) |  |
| ArchivedCarResponse | [#/components/schemas/ArchivedCarResponse](#componentsschemasarchivedcarresponse) |  |
| User | [#/components/schemas/User](#componentsschemasuser) |  |
| Admin | [#/components/schemas/Admin](#componentsschemasadmin) |  |
| SimpleUser | [#/components/schemas/SimpleUser](#componentsschemassimpleuser) |  |
| RegisterCred | [#/components/schemas/RegisterCred](#componentsschemasregistercred) |  |
| LoginCred | [#/components/schemas/LoginCred](#componentsschemaslogincred) |  |

## Path Details

***

### [POST]/register

- Summary  
Register new member

- Description  
Register new account with member role

- Security  
undefined  

#### RequestBody

- application/json

```ts
{
  name: string
  email: string
  password: string
}
```

#### Responses

- 201 Created

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    name?: string
    email?: string
    role?: string
  }
}
```

- 409 Conflict, email already registered

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check missing fields from requestBody

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [POST]/login

- Summary  
Login with account

- Description  
Login and get bearer token for auth

- Security  
undefined  

#### RequestBody

- application/json

```ts
{
  email: string
  password: string
}
```

#### Responses

- 201 Created

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    name?: string
    email?: string
    role?: string
    token?: string
  }
}
```

- 401 invalid email / password

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check missing fields from requestBody

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [GET]/whoami

- Summary  
Get current user data

- Description  
Return current user data based on bearer token   
  
 Allowed roles: superadmin, admin, member

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    name?: string
    email?: string
    role?: string
  }
}
```

- 401 Unauthorized, bearer token invalid

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [GET]/users

- Summary  
Get current registered users

- Description  
Return list of all users    
  
 Allowed roles: superadmin, admin

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    name?: string
    email?: string
    role?: string
  }[]
  meta: {
    total?: integer
  }
}
```

- 401 Unauthorized, bearer token invalid or auth level below admin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [POST]/admins

- Summary  
Add new admin

- Description  
Add new admin account    
  
 Allowed roles: superadmin

#### RequestBody

- application/json

```ts
{
  name: string
  email: string
  password: string
}
```

#### Responses

- 201 Created

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    name?: string
    email?: string
    role?: string
  }
}
```

- 401 Unauthorized, bearer token invalid or auth level below superadmin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 409 Conflict, email already registered

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check missing fields from requestBody

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [POST]/images

- Summary  
Upload image to server

- Description  
Upload image to cloudinary then store the metadata to database   
  
 Allowed roles: superadmin, admin

#### RequestBody

- multipart/form-data

```ts
{
  image: string
}
```

#### Responses

- 201 Created

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    url?: string
    public_id?: integer
  }
}
```

- 401 Unauthorized, bearer token invalid or auth level below admin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check missing fields from requestBody

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [GET]/images/{imageId}

- Summary  
Get image data by ID

- Description  
Return image data based on the image ID   
  
 Allowed roles: superadmin, admin, member

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    url?: string
    public_id?: integer
  }
}
```

- 401 Unauthorized, bearer token invalid

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 404 Not Found, image Id not found

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check parameter format

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [DELETE]/images/{imageId}

- Summary  
Delete image from server by ID

- Description  
Delete image from cloudinary and metadata from database based on the image ID   
  
 Allowed roles: superadmin, admin

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 401 Unauthorized, bearer token invalid or auth level below admin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 404 Not Found, image Id not found

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check parameter format

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [GET]/cars

- Summary  
Get car list

- Description  
Return car data list   
  
 Allowed roles: superadmin, admin, member

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    name?: string
    size?: string
    rent_per_day?: integer
    image: {
      id?: integer
      url?: string
      public_id?: integer
    }
    createdBy: {
      id?: integer
      name?: string
    }
    createdAt?: string
    updatedBy:#/components/schemas/SimpleUser
    updatedAt?: string
  }[]
  meta: {
    total?: integer
  }
}
```

- 401 Unauthorized, bearer token invalid

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [POST]/cars

- Summary  
Add new car data

- Description  
Add new car data to database   
  
 Allowed roles: superadmin, admin

#### RequestBody

- application/json

```ts
{
  name: string
  size: string
  rent_per_day: integer
  image_id?: integer
}
```

#### Responses

- 201 Created

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    name?: string
    size?: string
    rent_per_day?: integer
    image_id?: integer
  }
}
```

- 401 Unauthorized, bearer token invalid or auth level below admin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check missing fields from requestBody

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [GET]/cars/{carId}

- Summary  
Get car data by ID

- Description  
Return car data based on the car ID   
  
 Allowed roles: superadmin, admin, member

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    name?: string
    size?: string
    rent_per_day?: integer
    image: {
      id?: integer
      url?: string
      public_id?: integer
    }
    createdBy: {
      id?: integer
      name?: string
    }
    createdAt?: string
    updatedBy:#/components/schemas/SimpleUser
    updatedAt?: string
  }
}
```

- 401 Unauthorized, bearer token invalid

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 404 Not Found, car Id not found

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check parameter format

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [PUT]/cars/{carId}

- Summary  
Edit car data by ID

- Description  
Modify car data based on the car ID   
  
 Allowed roles: superadmin, admin

#### RequestBody

- aplication/json

```ts
{
  id?: integer
  name?: string
  size?: string
  rent_per_day?: integer
  image_id?: integer
}
```

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 401 Unauthorized, bearer token invalid or auth level below admin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 404 Not Found, car Id not found

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check parameter format / allowed fields

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [DELETE]/cars/{carId}

- Summary  
Delete car data by ID

- Description  
Delete car data based on the car ID   
  
 Allowed roles: superadmin, admin

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 401 Unauthorized, bearer token invalid or auth level below admin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 404 Not Found, car Id not found

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check parameter format

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [GET]/archive/cars

- Summary  
Get archived car data list

- Description  
Return deleted / archived car data list   
  
 Allowed roles: superadmin, admin

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    name?: string
    size?: string
    rent_per_day?: integer
    image: {
      id?: integer
      url?: string
      public_id?: integer
    }
    createdBy: {
      id?: integer
      name?: string
    }
    createdAt?: string
    deletedBy:#/components/schemas/SimpleUser
    deletedAt?: string
  }[]
  meta: {
    total?: integer
  }
}
```

- 401 Unauthorized, bearer token invalid or auth level below admin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [GET]/archive/cars/{carId}

- Summary  
Get archived car data by ID

- Description  
Return archived car data based on the car ID   
  
 Allowed roles: superadmin, admin

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
  data: {
    id?: integer
    name?: string
    size?: string
    rent_per_day?: integer
    image: {
      id?: integer
      url?: string
      public_id?: integer
    }
    createdBy: {
      id?: integer
      name?: string
    }
    createdAt?: string
    deletedBy:#/components/schemas/SimpleUser
    deletedAt?: string
  }
}
```

- 401 Unauthorized, bearer token invalid or auth level below admin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 404 Not Found, car Id not found

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check parameter format

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [DELETE]/archive/cars/{carId}

- Summary  
Destroy archived car data by ID

- Description  
Destroy permanently archived car data based on the car ID   
  
 Allowed roles: superadmin, admin

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 401 Unauthorized, bearer token invalid or auth level below admin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 404 Not Found, car Id not found

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check parameter format

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

***

### [GET]/archive/cars/{carId}/restore

- Summary  
Restore archived car data by ID

- Description  
Restore deleted car data based on the car ID   
  
 Allowed roles: superadmin, admin

#### Responses

- 200 OK

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 401 Unauthorized, bearer token invalid or auth level below admin

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 404 Not Found, car Id not found

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- 422 Unprocessable Entity, check parameter format

`application/json`

```ts
{
  status?: string
  message?: string
}
```

- default Default error response

`application/json`

```ts
{
  status?: string
  message?: string
}
```

## References

### #/components/securitySchemes/bearerAuth

```ts
{
  "type": "http",
  "scheme": "bearer",
  "bearerFormat": "JWT"
}
```

### #/components/schemas/DefaultErrMsg

```ts
{
  status?: string
  message?: string
}
```

### #/components/schemas/UnauthorizedMsg

```ts
{
  status?: string
  message?: string
}
```

### #/components/schemas/MissingFieldMsg

```ts
{
  status?: string
  message?: string
}
```

### #/components/schemas/InvalidParamMsg

```ts
{
  status?: string
  message?: string
}
```

### #/components/schemas/Image

```ts
{
  id?: integer
  url?: string
  public_id?: integer
}
```

### #/components/schemas/CarRequest

```ts
{
  id?: integer
  name?: string
  size?: string
  rent_per_day?: integer
  image_id?: integer
}
```

### #/components/schemas/CarResponse

```ts
{
  id?: integer
  name?: string
  size?: string
  rent_per_day?: integer
  image: {
    id?: integer
    url?: string
    public_id?: integer
  }
  createdBy: {
    id?: integer
    name?: string
  }
  createdAt?: string
  updatedBy:#/components/schemas/SimpleUser
  updatedAt?: string
}
```

### #/components/schemas/ArchivedCarResponse

```ts
{
  id?: integer
  name?: string
  size?: string
  rent_per_day?: integer
  image: {
    id?: integer
    url?: string
    public_id?: integer
  }
  createdBy: {
    id?: integer
    name?: string
  }
  createdAt?: string
  deletedBy:#/components/schemas/SimpleUser
  deletedAt?: string
}
```

### #/components/schemas/User

```ts
{
  id?: integer
  name?: string
  email?: string
  role?: string
}
```

### #/components/schemas/Admin

```ts
{
  id?: integer
  name?: string
  email?: string
  role?: string
}
```

### #/components/schemas/SimpleUser

```ts
{
  id?: integer
  name?: string
}
```

### #/components/schemas/RegisterCred

```ts
{
  name: string
  email: string
  password: string
}
```

### #/components/schemas/LoginCred

```ts
{
  id?: integer
  name?: string
  email?: string
  role?: string
  token?: string
}
```