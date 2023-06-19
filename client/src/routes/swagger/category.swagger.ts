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
