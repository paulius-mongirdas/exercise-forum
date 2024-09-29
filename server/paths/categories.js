export default function() {
    let operations = {
      GET,
      POST,
      PUT,
      DELETE,
    };
    // demo
    function GET(req, res, next) {
      res.status(200).json([
        { id: 0, message: "First category" },
        { id: 1, message: "Second category" },
      ]);
    }
    // demo
    function POST(req, res, next) {
      console.log(`About to create category: ${JSON.stringify(req.body)}`);
      res.status(201).send();
    }
    // demo
    function PUT(req, res, next) {
      console.log(`About to update category id: ${req.query.id}`);
      res.status(200).send();
    }
    // demo
    function DELETE(req, res, next) {
      console.log(`About to delete category id: ${req.query.id}`);
      res.status(200).send();
    }
  
    GET.apiDoc = {
      summary: "Returns list of categories",
      operationId: "getCategories",
      responses: {
        200: {
          description: "List of categories",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Category",
                },
              },
            },
          },
        },
      },
    };
    POST.apiDoc = {
      summary: "Creates a new category",
      operationId: "createCategory",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Category",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Newly created category",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Category",
              },
            },
          },
        },
      },
    };
    DELETE.apiDoc = {
      summary: "Deletes an existing category",
      operationId: "deleteCategory",
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        204: {
          description: "No content",
          content: {},
        },
      },
    };
  
    return operations;
  };