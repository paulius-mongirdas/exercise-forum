import express from 'express';
import { initialize } from 'express-openapi';

const app = express();

// OpenAPI routes
initialize({
    app,
    apiDoc: 'api-doc.yml',
    paths: "./paths",
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});