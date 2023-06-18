/**
 * @swagger
 *    components:
 *       schemas:
 *          GetOTP:
 *             type: object
 *             required:
 *                -  mobile
 *             properties:
 *                   mobile:
 *                      type: string
 *                      description: the user mobile for auth
 *          CheckOTP:
 *             type: object
 *             required:
 *                -  mobile
 *                -  code
 *             properties:
 *                mobile:
 *                   type: string
 *                   description: the user mobile for auth
 *                code:
 *                   type: string
 *                   description: resived code from GetOTP
 */

/**
 * @swagger
 *    /auth/get-otp:
 *       post:
 *          tags: [User-Authentication]
 *          summary: login user in account with phone number
 *          description: one time password(OTP) login
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/GetOTP'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/GetOTP'
 *          responses:
 *             201:
 *                description: success
 *             400:
 *                description: bad request
 *             401:
 *                description: unauthorization
 *             500:
 *                description: internal server error
 */

/**
 * @swagger
 *    /auth/check-otp:
 *       post:
 *          tags: [User-Authentication]
 *          summary: check-otp value in user controller
 *          description: check otp with code - mobile and expires dete
 *          requestBody:
 *             required: true
 *             content:
 *                application/x-www-form-urlencoded:
 *                   schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *                application/json:
 *                   schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *          responses:
 *             201:
 *                description: success
 *             400:
 *                description: bad request
 *             401:
 *                description: unauthorization
 *             500:
 *                description: internal server error
 */
