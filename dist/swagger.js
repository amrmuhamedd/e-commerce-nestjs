"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const schema = {
        production: 'https',
        staging: 'https',
        development: 'http',
    };
    const options = new swagger_1.DocumentBuilder()
        .setTitle('API')
        .setVersion('0.0.1')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('docs', app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map