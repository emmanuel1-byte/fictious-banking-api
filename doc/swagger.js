import swaggerJsDoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple-fictious-bank',
            version: '1.0.0',
            description: 'API Documentation for simple-fictious-bank',
            contact: {
                name: 'Emmanuel hilary',
                email: 'emmanuelhilary9@gmail.com'
              },
        },
        servers: [
            {
                url:'https://fictious-banking-api.onrender.com'
            }
        ],

    },
    apis: ['./src/modules/account/controller.js', './src/modules/auth/controller.js', './src/modules/transaction/controller.js']
}

export const swaggerSpec = swaggerJsDoc(options)