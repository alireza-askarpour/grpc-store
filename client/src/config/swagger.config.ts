import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"

export const swaggerSetup = swaggerUI.setup(
  swaggerJSDoc({
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "gRPC Store",
        version: "1.0.0",
        description:
          "The gRPC Store application built using gRPC, Node.js, TypeScript, Express and MongoDB",
        contact: {
          name: "Alireza Askarpour",
          email: "askarpourdev@gmail.com",
        },
      },
      server: [
        {
          url: process.env.BASE_URL,
        },
      ],
    },
    apis: ["./src/routes/swagger/*.ts"],
  })
)
