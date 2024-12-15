<!-- Generator: Widdershins v4.0.1 -->

<h1 id="server">server v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

Base URLs:

* <a href="http://{baseUrl}/">http://{baseUrl}/</a>

 License: ISC

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="server-default">Default</h1>

## GetCurrentUser

<a id="opIdGetCurrentUser"></a>

`GET /api/users/me`

Get the current user

> Example responses

> 200 Response

```json
{
  "roleId": 0.1,
  "updatedAt": "2019-08-24T14:15:22Z",
  "createdAt": "2019-08-24T14:15:22Z",
  "password": "string",
  "email": "string",
  "uuid": "string",
  "id": 0.1,
  "name": "string"
}
```

<h3 id="getcurrentuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwt ( Scopes: admin user )
</aside>

## GetUserByUUID

<a id="opIdGetUserByUUID"></a>

`GET /api/users/{uuid}`

Get a user

<h3 id="getuserbyuuid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|uuid|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "roleId": 0.1,
  "updatedAt": "2019-08-24T14:15:22Z",
  "createdAt": "2019-08-24T14:15:22Z",
  "password": "string",
  "email": "string",
  "uuid": "string",
  "id": 0.1,
  "name": "string"
}
```

<h3 id="getuserbyuuid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## GetExercises

<a id="opIdGetExercises"></a>

`GET /api/categories/{categoryId}/exercises`

Retrieves a list of existing exercises from a category

<h3 id="getexercises-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category that exercise links to|

> Example responses

> 200 Response

```json
[
  {
    "categoryId": 0.1,
    "userId": "string",
    "video_url": "string",
    "reps": 0.1,
    "sets": 0.1,
    "duration": 0.1,
    "description": "string",
    "difficulty": "LIGHT",
    "title": "string",
    "id": 0.1
  }
]
```

<h3 id="getexercises-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="getexercises-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Exercise](#schemaexercise)]|false|none|none|
|» categoryId|number(double)|true|none|none|
|» userId|string|true|none|none|
|» video_url|string|true|none|none|
|» reps|number(double)|true|none|none|
|» sets|number(double)|true|none|none|
|» duration|number(double)|true|none|none|
|» description|string|true|none|none|
|» difficulty|[Difficulty](#schemadifficulty)|true|none|none|
|» title|string|true|none|none|
|» id|number(double)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|difficulty|LIGHT|
|difficulty|MODERATE|
|difficulty|HARD|
|difficulty|EXTREME|

<aside class="success">
This operation does not require authentication
</aside>

## CreateExercise

<a id="opIdCreateExercise"></a>

`POST /api/categories/{categoryId}/exercises`

Creates a new exercise for a category

> Body parameter

```json
{
  "title": "string",
  "difficulty": "LIGHT",
  "description": "string",
  "duration": 0.1,
  "sets": 0.1,
  "reps": 0.1,
  "video_url": "string"
}
```

<h3 id="createexercise-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category that exercise links to|
|body|body|[ExerciseDto](#schemaexercisedto)|true|Data object describing a new exercise|

> Example responses

> 201 Response

```json
{
  "categoryId": 0.1,
  "userId": "string",
  "video_url": "string",
  "reps": 0.1,
  "sets": 0.1,
  "duration": 0.1,
  "description": "string",
  "difficulty": "LIGHT",
  "title": "string",
  "id": 0.1
}
```

<h3 id="createexercise-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[Exercise](#schemaexercise)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwt ( Scopes: admin user )
</aside>

## GetExercise

<a id="opIdGetExercise"></a>

`GET /api/categories/{categoryId}/exercises/{exerciseId}`

Retrieves details of a specific exercise from a category

<h3 id="getexercise-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category that exercise links to|
|exerciseId|path|number(double)|true|ID of an exercise|

> Example responses

> 200 Response

```json
{
  "categoryId": 0.1,
  "userId": "string",
  "video_url": "string",
  "reps": 0.1,
  "sets": 0.1,
  "duration": 0.1,
  "description": "string",
  "difficulty": "LIGHT",
  "title": "string",
  "id": 0.1
}
```

<h3 id="getexercise-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="getexercise-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» categoryId|number(double)|true|none|none|
|» userId|string|true|none|none|
|» video_url|string|true|none|none|
|» reps|number(double)|true|none|none|
|» sets|number(double)|true|none|none|
|» duration|number(double)|true|none|none|
|» description|string|true|none|none|
|» difficulty|[Difficulty](#schemadifficulty)|true|none|none|
|» title|string|true|none|none|
|» id|number(double)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|difficulty|LIGHT|
|difficulty|MODERATE|
|difficulty|HARD|
|difficulty|EXTREME|

<aside class="success">
This operation does not require authentication
</aside>

## UpdateExercise

<a id="opIdUpdateExercise"></a>

`PUT /api/categories/{categoryId}/exercises/{exerciseId}`

Updates an existing exercise of a category

> Body parameter

```json
{
  "title": "string",
  "difficulty": "LIGHT",
  "description": "string",
  "duration": 0.1,
  "sets": 0.1,
  "reps": 0.1,
  "video_url": "string"
}
```

<h3 id="updateexercise-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category that exercise links to|
|exerciseId|path|number(double)|true|ID of an exercise|
|body|body|[ExerciseDto](#schemaexercisedto)|true|Data object describing a new exercise|

> Example responses

> 200 Response

```json
{
  "categoryId": 0.1,
  "userId": "string",
  "video_url": "string",
  "reps": 0.1,
  "sets": 0.1,
  "duration": 0.1,
  "description": "string",
  "difficulty": "LIGHT",
  "title": "string",
  "id": 0.1
}
```

<h3 id="updateexercise-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="updateexercise-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» categoryId|number(double)|true|none|none|
|» userId|string|true|none|none|
|» video_url|string|true|none|none|
|» reps|number(double)|true|none|none|
|» sets|number(double)|true|none|none|
|» duration|number(double)|true|none|none|
|» description|string|true|none|none|
|» difficulty|[Difficulty](#schemadifficulty)|true|none|none|
|» title|string|true|none|none|
|» id|number(double)|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|difficulty|LIGHT|
|difficulty|MODERATE|
|difficulty|HARD|
|difficulty|EXTREME|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwt ( Scopes: admin user )
</aside>

## DeleteExercise

<a id="opIdDeleteExercise"></a>

`DELETE /api/categories/{categoryId}/exercises/{exerciseId}`

Deletes an existing exercise of a category

<h3 id="deleteexercise-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category that exercise links to|
|exerciseId|path|number(double)|true|ID of an exercise|

<h3 id="deleteexercise-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No content|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwt ( Scopes: admin user )
</aside>

## GetComments

<a id="opIdGetComments"></a>

`GET /api/categories/{categoryId}/exercises/{exerciseId}/comments`

Retrieves a list of existing comments from an exercise

<h3 id="getcomments-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category that exercise links to|
|exerciseId|path|number(double)|true|ID of an exercise that comment links to|

> Example responses

> 200 Response

```json
[
  {
    "exerciseId": 0.1,
    "text": "string",
    "userId": "string",
    "id": 0.1
  }
]
```

<h3 id="getcomments-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="getcomments-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Comment](#schemacomment)]|false|none|none|
|» exerciseId|number(double)|true|none|none|
|» text|string|true|none|none|
|» userId|string|true|none|none|
|» id|number(double)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## CreateComment

<a id="opIdCreateComment"></a>

`POST /api/categories/{categoryId}/exercises/{exerciseId}/comments`

Creates a new comment for an exercise

> Body parameter

```json
{
  "text": "string"
}
```

<h3 id="createcomment-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category that exercise links to|
|exerciseId|path|number(double)|true|ID of an exercise that comment links to|
|body|body|[CommentDto](#schemacommentdto)|true|Data object describing a new comment|

> Example responses

> 201 Response

```json
{
  "exerciseId": 0.1,
  "text": "string",
  "userId": "string",
  "id": 0.1
}
```

<h3 id="createcomment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[Comment](#schemacomment)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwt ( Scopes: admin user )
</aside>

## GetComment

<a id="opIdGetComment"></a>

`GET /api/categories/{categoryId}/exercises/{exerciseId}/comments/{commentId}`

Retrieves details of a specific comment from an exercise

<h3 id="getcomment-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category that exercise links to|
|exerciseId|path|number(double)|true|ID of an exercise that comment links to|
|commentId|path|number(double)|true|ID of a comment|

> Example responses

> 200 Response

```json
{
  "exerciseId": 0.1,
  "text": "string",
  "userId": "string",
  "id": 0.1
}
```

<h3 id="getcomment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="getcomment-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» exerciseId|number(double)|true|none|none|
|» text|string|true|none|none|
|» userId|string|true|none|none|
|» id|number(double)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## UpdateComment

<a id="opIdUpdateComment"></a>

`PUT /api/categories/{categoryId}/exercises/{exerciseId}/comments/{commentId}`

Updates an existing comment of an exercise

> Body parameter

```json
{
  "text": "string"
}
```

<h3 id="updatecomment-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category that exercise links to|
|exerciseId|path|number(double)|true|ID of an exercise that comment links to|
|commentId|path|number(double)|true|ID of a comment|
|body|body|[CommentDto](#schemacommentdto)|true|Data object describing an updated comment|

> Example responses

> 200 Response

```json
{
  "exerciseId": 0.1,
  "text": "string",
  "userId": "string",
  "id": 0.1
}
```

<h3 id="updatecomment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="updatecomment-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» exerciseId|number(double)|true|none|none|
|» text|string|true|none|none|
|» userId|string|true|none|none|
|» id|number(double)|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwt ( Scopes: admin user )
</aside>

## DeleteComment

<a id="opIdDeleteComment"></a>

`DELETE /api/categories/{categoryId}/exercises/{exerciseId}/comments/{commentId}`

Deletes an existing comment of an exercise

<h3 id="deletecomment-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category that exercise links to|
|exerciseId|path|number(double)|true|ID of an exercise that comment links to|
|commentId|path|number(double)|true|ID of a comment|

<h3 id="deletecomment-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No content|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwt ( Scopes: admin user )
</aside>

## GetCategories

<a id="opIdGetCategories"></a>

`GET /api/categories`

Retrieves a list of existing categories

> Example responses

> 200 Response

```json
[
  {
    "image_url": "string",
    "userId": "string",
    "description": "string",
    "title": "string",
    "id": 0.1
  }
]
```

<h3 id="getcategories-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="getcategories-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Category](#schemacategory)]|false|none|none|
|» image_url|string|true|none|none|
|» userId|string|true|none|none|
|» description|string|true|none|none|
|» title|string|true|none|none|
|» id|number(double)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## CreateCategory

<a id="opIdCreateCategory"></a>

`POST /api/categories`

Creates a new category

> Body parameter

```json
{
  "title": "string",
  "description": "string",
  "image_url": "string"
}
```

<h3 id="createcategory-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CategoryDto](#schemacategorydto)|true|Data object describing a new category|

> Example responses

> 201 Response

```json
{
  "image_url": "string",
  "userId": "string",
  "description": "string",
  "title": "string",
  "id": 0.1
}
```

<h3 id="createcategory-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created|[Category](#schemacategory)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwt ( Scopes: admin )
</aside>

## GetCategory

<a id="opIdGetCategory"></a>

`GET /api/categories/{categoryId}`

Retrieves details of a specific category

<h3 id="getcategory-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category|

> Example responses

> 200 Response

```json
{
  "image_url": "string",
  "userId": "string",
  "description": "string",
  "title": "string",
  "id": 0.1
}
```

<h3 id="getcategory-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="getcategory-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» image_url|string|true|none|none|
|» userId|string|true|none|none|
|» description|string|true|none|none|
|» title|string|true|none|none|
|» id|number(double)|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## UpdateCategory

<a id="opIdUpdateCategory"></a>

`PUT /api/categories/{categoryId}`

Updates an existing category

> Body parameter

```json
{
  "title": "string",
  "description": "string",
  "image_url": "string"
}
```

<h3 id="updatecategory-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category|
|body|body|[CategoryDto](#schemacategorydto)|true|Data object describing an updated category|

> Example responses

> 200 Response

```json
{
  "image_url": "string",
  "userId": "string",
  "description": "string",
  "title": "string",
  "id": 0.1
}
```

<h3 id="updatecategory-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="updatecategory-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» image_url|string|true|none|none|
|» userId|string|true|none|none|
|» description|string|true|none|none|
|» title|string|true|none|none|
|» id|number(double)|true|none|none|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwt ( Scopes: admin )
</aside>

## DeleteCategory

<a id="opIdDeleteCategory"></a>

`DELETE /api/categories/{categoryId}`

Removes an existing category

<h3 id="deletecategory-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|categoryId|path|number(double)|true|ID of a category|

<h3 id="deletecategory-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|No content|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
jwt ( Scopes: admin )
</aside>

## Register

<a id="opIdRegister"></a>

`POST /api/register`

Register a user

> Body parameter

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

<h3 id="register-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RegisterDto](#schemaregisterdto)|true|Data object describing a new user|

> Example responses

> 200 Response

```json
{
  "roleId": 0.1,
  "updatedAt": "2019-08-24T14:15:22Z",
  "createdAt": "2019-08-24T14:15:22Z",
  "password": "string",
  "email": "string",
  "uuid": "string",
  "id": 0.1,
  "name": "string"
}
```

<h3 id="register-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## Login

<a id="opIdLogin"></a>

`POST /api/login`

Log in a user

> Body parameter

```json
{
  "email": "string",
  "password": "string"
}
```

<h3 id="login-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LoginDto](#schemalogindto)|true|Data object describing a user|

> Example responses

> 200 Response

```json
{}
```

<h3 id="login-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="login-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Refresh

<a id="opIdRefresh"></a>

`POST /api/refresh`

Refresh a user's token

> Body parameter

```json
{
  "token": "string"
}
```

<h3 id="refresh-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[TokenDto](#schematokendto)|true|A refresh token|

> Example responses

> 200 Response

```json
{}
```

<h3 id="refresh-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="refresh-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Logout

<a id="opIdLogout"></a>

`POST /api/logout`

Log out a user

> Example responses

> 200 Response

```json
{}
```

<h3 id="logout-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Ok|Inline|

<h3 id="logout-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_DefaultSelection_Prisma._36_UserPayload_">DefaultSelection_Prisma._36_UserPayload_</h2>
<!-- backwards compatibility -->
<a id="schemadefaultselection_prisma._36_userpayload_"></a>
<a id="schema_DefaultSelection_Prisma._36_UserPayload_"></a>
<a id="tocSdefaultselection_prisma._36_userpayload_"></a>
<a id="tocsdefaultselection_prisma._36_userpayload_"></a>

```json
{
  "roleId": 0.1,
  "updatedAt": "2019-08-24T14:15:22Z",
  "createdAt": "2019-08-24T14:15:22Z",
  "password": "string",
  "email": "string",
  "uuid": "string",
  "id": 0.1,
  "name": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|roleId|number(double)|true|none|none|
|updatedAt|string(date-time)|true|none|none|
|createdAt|string(date-time)|true|none|none|
|password|string|true|none|none|
|email|string|true|none|none|
|uuid|string|true|none|none|
|id|number(double)|true|none|none|
|name|string|true|none|none|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "roleId": 0.1,
  "updatedAt": "2019-08-24T14:15:22Z",
  "createdAt": "2019-08-24T14:15:22Z",
  "password": "string",
  "email": "string",
  "uuid": "string",
  "id": 0.1,
  "name": "string"
}

```

Model User

### Properties

*None*

<h2 id="tocS__36_Enums.Difficulty">_36_Enums.Difficulty</h2>
<!-- backwards compatibility -->
<a id="schema_36_enums.difficulty"></a>
<a id="schema__36_Enums.Difficulty"></a>
<a id="tocS_36_enums.difficulty"></a>
<a id="tocs_36_enums.difficulty"></a>

```json
"LIGHT"

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|*anonymous*|LIGHT|
|*anonymous*|MODERATE|
|*anonymous*|HARD|
|*anonymous*|EXTREME|

<h2 id="tocS_DefaultSelection_Prisma._36_ExercisePayload_">DefaultSelection_Prisma._36_ExercisePayload_</h2>
<!-- backwards compatibility -->
<a id="schemadefaultselection_prisma._36_exercisepayload_"></a>
<a id="schema_DefaultSelection_Prisma._36_ExercisePayload_"></a>
<a id="tocSdefaultselection_prisma._36_exercisepayload_"></a>
<a id="tocsdefaultselection_prisma._36_exercisepayload_"></a>

```json
{
  "categoryId": 0.1,
  "userId": "string",
  "video_url": "string",
  "reps": 0.1,
  "sets": 0.1,
  "duration": 0.1,
  "description": "string",
  "difficulty": "LIGHT",
  "title": "string",
  "id": 0.1
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|categoryId|number(double)|true|none|none|
|userId|string|true|none|none|
|video_url|string|true|none|none|
|reps|number(double)|true|none|none|
|sets|number(double)|true|none|none|
|duration|number(double)|true|none|none|
|description|string|true|none|none|
|difficulty|[_36_Enums.Difficulty](#schema_36_enums.difficulty)|true|none|none|
|title|string|true|none|none|
|id|number(double)|true|none|none|

<h2 id="tocS_Exercise">Exercise</h2>
<!-- backwards compatibility -->
<a id="schemaexercise"></a>
<a id="schema_Exercise"></a>
<a id="tocSexercise"></a>
<a id="tocsexercise"></a>

```json
{
  "categoryId": 0.1,
  "userId": "string",
  "video_url": "string",
  "reps": 0.1,
  "sets": 0.1,
  "duration": 0.1,
  "description": "string",
  "difficulty": "LIGHT",
  "title": "string",
  "id": 0.1
}

```

Model Exercise

### Properties

*None*

<h2 id="tocS_Difficulty">Difficulty</h2>
<!-- backwards compatibility -->
<a id="schemadifficulty"></a>
<a id="schema_Difficulty"></a>
<a id="tocSdifficulty"></a>
<a id="tocsdifficulty"></a>

```json
"LIGHT"

```

### Properties

*None*

<h2 id="tocS_ExerciseDto">ExerciseDto</h2>
<!-- backwards compatibility -->
<a id="schemaexercisedto"></a>
<a id="schema_ExerciseDto"></a>
<a id="tocSexercisedto"></a>
<a id="tocsexercisedto"></a>

```json
{
  "title": "string",
  "difficulty": "LIGHT",
  "description": "string",
  "duration": 0.1,
  "sets": 0.1,
  "reps": 0.1,
  "video_url": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|Title of an exercise|
|difficulty|[Difficulty](#schemadifficulty)|true|none|Difficulty of an exercise (LIGHT, MODERATE, HARD, EXTREME)|
|description|string|true|none|Description for an exercise|
|duration|number(double)|true|none|Duration for an exercise (minutes)|
|sets|number(double)|false|none|Number of sets for an exercise|
|reps|number(double)|false|none|Number of repetitions for an exercise|
|video_url|string|false|none|Video URL for visualizing an exercise|

<h2 id="tocS_DefaultSelection_Prisma._36_CommentPayload_">DefaultSelection_Prisma._36_CommentPayload_</h2>
<!-- backwards compatibility -->
<a id="schemadefaultselection_prisma._36_commentpayload_"></a>
<a id="schema_DefaultSelection_Prisma._36_CommentPayload_"></a>
<a id="tocSdefaultselection_prisma._36_commentpayload_"></a>
<a id="tocsdefaultselection_prisma._36_commentpayload_"></a>

```json
{
  "exerciseId": 0.1,
  "text": "string",
  "userId": "string",
  "id": 0.1
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|exerciseId|number(double)|true|none|none|
|text|string|true|none|none|
|userId|string|true|none|none|
|id|number(double)|true|none|none|

<h2 id="tocS_Comment">Comment</h2>
<!-- backwards compatibility -->
<a id="schemacomment"></a>
<a id="schema_Comment"></a>
<a id="tocScomment"></a>
<a id="tocscomment"></a>

```json
{
  "exerciseId": 0.1,
  "text": "string",
  "userId": "string",
  "id": 0.1
}

```

Model Comment

### Properties

*None*

<h2 id="tocS_CommentDto">CommentDto</h2>
<!-- backwards compatibility -->
<a id="schemacommentdto"></a>
<a id="schema_CommentDto"></a>
<a id="tocScommentdto"></a>
<a id="tocscommentdto"></a>

```json
{
  "text": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|text|string|true|none|Comment text|

<h2 id="tocS_DefaultSelection_Prisma._36_CategoryPayload_">DefaultSelection_Prisma._36_CategoryPayload_</h2>
<!-- backwards compatibility -->
<a id="schemadefaultselection_prisma._36_categorypayload_"></a>
<a id="schema_DefaultSelection_Prisma._36_CategoryPayload_"></a>
<a id="tocSdefaultselection_prisma._36_categorypayload_"></a>
<a id="tocsdefaultselection_prisma._36_categorypayload_"></a>

```json
{
  "image_url": "string",
  "userId": "string",
  "description": "string",
  "title": "string",
  "id": 0.1
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|image_url|string|true|none|none|
|userId|string|true|none|none|
|description|string|true|none|none|
|title|string|true|none|none|
|id|number(double)|true|none|none|

<h2 id="tocS_Category">Category</h2>
<!-- backwards compatibility -->
<a id="schemacategory"></a>
<a id="schema_Category"></a>
<a id="tocScategory"></a>
<a id="tocscategory"></a>

```json
{
  "image_url": "string",
  "userId": "string",
  "description": "string",
  "title": "string",
  "id": 0.1
}

```

Model Category

### Properties

*None*

<h2 id="tocS_CategoryDto">CategoryDto</h2>
<!-- backwards compatibility -->
<a id="schemacategorydto"></a>
<a id="schema_CategoryDto"></a>
<a id="tocScategorydto"></a>
<a id="tocscategorydto"></a>

```json
{
  "title": "string",
  "description": "string",
  "image_url": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|Title of a category|
|description|string|true|none|Description for a category|
|image_url|string|false|none|URL for an image visualizing a category|

<h2 id="tocS_RegisterDto">RegisterDto</h2>
<!-- backwards compatibility -->
<a id="schemaregisterdto"></a>
<a id="schema_RegisterDto"></a>
<a id="tocSregisterdto"></a>
<a id="tocsregisterdto"></a>

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|Username of a user|
|email|string|true|none|Email of a user|
|password|string|true|none|Password of a user|

<h2 id="tocS_LoginDto">LoginDto</h2>
<!-- backwards compatibility -->
<a id="schemalogindto"></a>
<a id="schema_LoginDto"></a>
<a id="tocSlogindto"></a>
<a id="tocslogindto"></a>

```json
{
  "email": "string",
  "password": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|true|none|Email of a user|
|password|string|true|none|Password of a user|

<h2 id="tocS_TokenDto">TokenDto</h2>
<!-- backwards compatibility -->
<a id="schematokendto"></a>
<a id="schema_TokenDto"></a>
<a id="tocStokendto"></a>
<a id="tocstokendto"></a>

```json
{
  "token": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|token|string|true|none|JWT token|

