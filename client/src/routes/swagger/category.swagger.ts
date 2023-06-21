/**
 * @swagger
 *    components:
 *       schemas:
 *          AddCategory:
 *             type: object
 *             required:
 *                -  name
 *                -  value
 *             properties:
 *                name:
 *                   type: string
 *                   description: name of category
 *                value:
 *                   type: string
 *                   description: value of category
 *                parent:
 *                   type: string
 *                   description: parent ID of category
 *          UpdateCategory:
 *             type: object
 *             properties:
 *                name:
 *                   type: string
 *                   description: name of category
 *                value:
 *                   type: string
 *                   description: value of category
 *                parent:
 *                   type: string
 *                   description: parent ID of category
 */

/**
 * @swagger
 *    /category:
 *       get:
 *          tags: [Category]
 *          summary: get all category
 *          responses:
 *             200:
 *                description: Category created successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorization
 *             500:
 *                description: Internal server error
 *
 */

/**
 * @swagger
 *    /category:
 *       post:
 *          tags: [Category]
 *          summary: create new category
 *          requestBody:
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/AddCategory'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/AddCategory'
 *          responses:
 *             200:
 *                description: Category created successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorization
 *             500:
 *                description: Internal server error
 *
 */

/**
 * @swagger
 *    /category/{id}:
 *       patch:
 *          tags: [Category]
 *          summary: update a category
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/UpdateCategory'
 *          responses:
 *             200:
 *                description: Category updated successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorization
 *             500:
 *                description: Internal server error
 *
 */

/**
 * @swagger
 *    /category/{id}:
 *       delete:
 *          tags: [Category]
 *          summary: remvoe a category
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *             200:
 *                description: Category updated successfully
 *             400:
 *                description: Bad request
 *             401:
 *                description: Unauthorization
 *             500:
 *                description: Internal server error
 *
 */
