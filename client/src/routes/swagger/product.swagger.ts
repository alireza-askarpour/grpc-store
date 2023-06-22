/**
 * @swagger
 *    components:
 *       schemas:
 *          AddProduct:
 *             type: object
 *             required:
 *                -  title
 *                -  description
 *                -  tags
 *                -  category
 *                -  price
 *                -  count
 *                -  images
 *             properties:
 *                title:
 *                   type: string
 *                   description: the title of product
 *                   example: Macbook Air M2
 *                description:
 *                   type: string
 *                   description: the description of product
 *                   example: This is test message for description
 *                tags:
 *                   type: array
 *                   description: the tags of product
 *                category:
 *                   type: string
 *                   description: the category of product
 *                   example: 642198c3f21d33422acb8507
 *                price:
 *                   type: number
 *                   description: the price of product
 *                   example: 49000
 *                count:
 *                   type: number
 *                   description: the count of product
 *                   example: 18
 *                images:
 *                   type: array
 *                   items:
 *                      type: string
 *                      format: binary
 *                   description: the images of product
 *          EditProduct:
 *             type: object
 *             properties:
 *                title:
 *                   type: string
 *                   description: the title of product
 *                   example: Macbook Air M2
 *                description:
 *                   type: string
 *                   description: the description of product
 *                   example: This is test message for description
 *                tags:
 *                   type: array
 *                   description: the tags of product
 *                category:
 *                   type: string
 *                   description: the category of product
 *                   example: 642198c3f21d33422acb8507
 *                price:
 *                   type: number
 *                   description: the price of product
 *                   example: 49000
 *                count:
 *                   type: number
 *                   description: the count of product
 *                   example: 18
 *                images:
 *                   type: array
 *                   items:
 *                      type: string
 *                      format: binary
 *                   description: the images of product
 */

/**
 * @swagger
 *    /product:
 *       post:
 *          tags: [Product]
 *          summary: create a product
 *          requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                   schema:
 *                      $ref: '#/components/schemas/AddProduct'
 *          responses:
 *             201:
 *                description: Product created successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal server error
 */

/**
 * @swagger
 *    /product/{id}:
 *       patch:
 *          tags: [Product]
 *          summary: update a product by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *             required: true
 *             content:
 *                multipart/form-data:
 *                   schema:
 *                      $ref: '#/components/schemas/EditProduct'
 *          responses:
 *             201:
 *                description: Product updated successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorized
 *             500:
 *                description: Internal server error
 */
