# exercise-forum

**Projekto pavadinimas:** fizinių pratimų informacinė sistema.

**Sistemos paskirtis:** suteikti naudotojams galimybę dalintis bei patiems sužinoti apie įvairių raumenų kategorijų pratimus. Svetainėje bus galima naršyti pagal raumenų kategorijas, kiekviena iš jų turės pratimus su aprašymais ir (pasirinktinai) video. Prie kiekvieno pratimo bus galima rašyti komentarus.

**Funkciniai reikalavimai:**
1. Turi būti realizuota naudotojų registracija.
2. Svečiai gali tik peržiūrėti kategorijas, pratimus ir komentarus.
3. Registruoti naudotojai gali peržiūrėti/kurti/redaguoti/naikinti savo pratimus bei komentarus.
4. Administratorius gali peržiūrėti/kurti/redaguoti/naikinti visas kategorijas, pratimus bei komentarus.

**Hierarchinis ryšys:**
kategorija(raumens_pavadinimas, aprašymas, nuotraukos_url) → pratimas(pavadinimas, trukmė, pakartojimai, sunkumas, aprašymas, video_url) → komentaras(tekstas)
(čia atributai yra ne galutiniai, labiau pateikiami kaip pavyzdys)

**Naudojamos technologijos:** React (front-end) ir Node.js su Express.js (back-end). Autorizacijai Passport.js. Duomenų bazė – PostgreSQL arba MongoDB.


### **EXERCISE API**
- **Url**: http://{baseUrl}/

---
### **Paths**
### /api/categories/{categoryId}/exercises

**GET**

**Description**: Retrieves a list of existing exercises from a category

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of exercise's category | number | * |

**[ Responses ]**

code: 200

description: Ok

- application/json:

    - type: array ( $schema: Exercise )

**POST**

**Description**: Creates a new exercise for a category

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of exercise's category | number | * |

**[ Request Body ]** *

- application/json:

    - $schema: ExerciseDto

**Example Value**:

```json
{
    "title" : "Calf raises",
    "difficulty" : "MODERATE",
    "description" : "Great medium-intensity exercise for improving calf strength.",
    "duration" : 3,
    "sets" : 2,
    "reps" : 20
}
```

**[ Responses ]**

code: 201

description: Created

- application/json:

    - $schema: Exercise

### /api/categories/{categoryId}/exercises/{exerciseId}

**GET**

**Description**: Retrieves details of a specific exercise from a category

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of exercise's category | number | * |
| exerciseId | path | The ID of exercise | number | * |

**[ Responses ]**

code: 200

description: Ok

- application/json:

**PUT**

**Description**: Updates an existing exercise of a category

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of exercise's category | number | * |
| exerciseId | path | The ID of exercise | number | * |

**[ Request Body ]** *

- application/json:

    - $schema: ExerciseDto

**Example Value**:

```json
{
    "title" : "Calf raises",
    "difficulty" : "MODERATE",
    "description" : "Great medium-intensity exercise for improving calf strength.",
    "duration" : 3
}
```

**[ Responses ]**

code: 200

description: Ok

- application/json:

**DELETE**

**Description**: Deletes an existing exercise of a category

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of exercise's category | number | * |
| exerciseId | path | The ID of exercise | number | * |

**[ Responses ]**

code: 204

description: No content

### /api/categories/{categoryId}/exercises/{exerciseId}/comments

**GET**

**Description**: Retrieves a list of existing comments from an exercise

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of exercise's category | number | * |
| exerciseId | path | The ID of comments's exercise | number | * |

**[ Responses ]**

code: 200

description: Ok

- application/json:

    - type: array ( $schema: Comment )

**POST**

**Description**: Creates a new comment for an exercise

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of exercise's category | number | * |
| exerciseId | path | The ID of comments's exercise | number | * |

**[ Request Body ]** *

- application/json:

    - $schema: CommentDto

**Example Value**:

```json
{
    "text" : "This exercise is really good!"
}
```

**[ Responses ]**

code: 201

description: Created

- application/json:

    - $schema: Comment

### /api/categories/{categoryId}/exercises/{exerciseId}/comments/{commentId}

**GET**

**Description**: Retrieves details of a specific comment from an exercise

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of exercise's category | number | * |
| exerciseId | path | The ID of comments's exercise | number | * |
| commentId | path | The ID of comment | number | * |

**[ Responses ]**

code: 200

description: Ok

- application/json:

**PUT**

**Description**: Updates an existing comment of an exercise

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of exercise's category | number | * |
| exerciseId | path | The ID of comments's exercise | number | * |
| commentId | path | The ID of comment | number | * |

**[ Request Body ]** *

- application/json:

    - $schema: CommentDto

**Example Value**:

```json
{
    "text" : "I think that this exercise should be in a different category."
}
```

**[ Responses ]**

code: 200

description: Ok

- application/json:

**DELETE**

**Description**: Deletes an existing comment of an exercise

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of exercise's category | number | * |
| exerciseId | path | The ID of comments's exercise | number | * |
| commentId | path | The ID of comment | number | * |

**[ Responses ]**

code: 204

description: No content

### /api/categories

**GET**

**Description**: Retrieves a list of existing categories

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|

**[ Responses ]**

code: 200

description: Ok

- application/json:

    - type: array ( $schema: Category )

**POST**

**Description**: Creates a new category

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|

**[ Request Body ]** *

- application/json:

    - $schema: CategoryDto

**Example Value**:

```json
{
    "title" : "Lower back",
    "description" : "Some simple exercises for improving lower back strength",
    "image_url" : "https://exerciseDB.com/images/lower_back_1.jpg"
}
```

**[ Responses ]**

code: 201

description: Created

- application/json:

    - $schema: Category

### /api/categories/{categoryId}

**GET**

**Description**: Retrieves details of a specific category

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of category | number | * |

**[ Responses ]**

code: 200

description: Ok

- application/json:

**PUT**

**Description**: Updates an existing category

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of category | number | * |

**[ Request Body ]** *

- application/json:

    - $schema: CategoryDto

**Example Value**:

```json
{
    "title" : "Upper back",
    "description" : "Some simple exercises for improving upper back strength"
}
```

**[ Responses ]**

code: 200

description: Ok

- application/json:

**DELETE**

**Description**: Removes an existing category

**[ Parameters ]**

| name | in | description | type | required |
|:-----|:-----:|:-----|:-----:|:-----:|
| categoryId | path | The ID of category | number | * |

**[ Responses ]**

code: 204

description: No content


---
### **Components**
### Schemas
**_36_Enums.Difficulty**

enum: [ LIGHT, MODERATE, HARD, EXTREME ]





**DefaultSelection_Prisma._36_ExercisePayload_**

**categoryId**:

- **number**

    - _format: double_

    - _required: true_

    - _nullable: false_

**video_url**:

- **string**

    - _required: true_

    - _nullable: false_

**reps**:

- **number**

    - _format: double_

    - _required: true_

    - _nullable: false_

**sets**:

- **number**

    - _format: double_

    - _required: true_

    - _nullable: false_

**duration**:

- **number**

    - _format: double_

    - _required: true_

    - _nullable: false_

**description**:

- **string**

    - _required: true_

    - _nullable: false_

**difficulty**:

- **_36_Enums.Difficulty**

    - _required: true_

    - _nullable: false_

**title**:

- **string**

    - _required: true_

    - _nullable: false_

**id**:

- **number**

    - _format: double_

    - _required: true_

    - _nullable: false_





**Exercise**

description: Model Exercise





**Difficulty**





**ExerciseDto**

**title**:

- **string**

    - _description: Title of an exercise_

    - _required: true_

    - _nullable: false_

**difficulty**:

- **Difficulty**

    - _description: Difficulty of an exercise (LIGHT, MODERATE, HARD, EXTREME)_

    - _required: true_

    - _nullable: false_

**description**:

- **string**

    - _description: Description for an exercise_

    - _required: true_

    - _nullable: false_

**duration**:

- **number**

    - _description: Duration for an exercise (minutes)_

    - _format: double_

    - _required: true_

    - _nullable: false_

**sets**:

- **number**

    - _description: Number of sets for an exercise_

    - _format: double_

    - _required: false_

    - _nullable: false_

**reps**:

- **number**

    - _description: Number of repetitions for an exercise_

    - _format: double_

    - _required: false_

    - _nullable: false_

**video_url**:

- **string**

    - _description: Video URL for visualizing an exercise_

    - _required: false_

    - _nullable: false_





**DefaultSelection_Prisma._36_CommentPayload_**

**exerciseId**:

- **number**

    - _format: double_

    - _required: true_

    - _nullable: false_

**text**:

- **string**

    - _required: true_

    - _nullable: false_

**id**:

- **number**

    - _format: double_

    - _required: true_

    - _nullable: false_





**Comment**

description: Model Comment





**CommentDto**

**text**:

- **string**

    - _description: Comment text_

    - _required: true_

    - _nullable: false_





**DefaultSelection_Prisma._36_CategoryPayload_**

**image_url**:

- **string**

    - _required: true_

    - _nullable: false_

**description**:

- **string**

    - _required: true_

    - _nullable: false_

**title**:

- **string**

    - _required: true_

    - _nullable: false_

**id**:

- **number**

    - _format: double_

    - _required: true_

    - _nullable: false_





**Category**

description: Model Category





**CategoryDto**

**title**:

- **string**

    - _description: Title of a category_

    - _required: true_

    - _nullable: false_

**description**:

- **string**

    - _description: Description for a category_

    - _required: true_

    - _nullable: false_

**image_url**:

- **string**

    - _description: URL for an image visualizing a category_

    - _required: false_

    - _nullable: false_






---
### Security Schemes

---
