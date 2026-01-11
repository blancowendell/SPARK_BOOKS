
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerCustomer = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SERVICE LINK API Documentation - Customer",
      version: "1.0.0",
      description: "API documentation for SERVICE LINK",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./document/customer.swagger.js"],
};

const swaggerDocsCustomer = swaggerJsDoc(swaggerCustomer);
module.exports = swaggerDocsCustomer;


//#region Auth

/**
 * @swagger
 * /customer-login:
 *   post:
 *     summary: Customer Login
 *     description: Authenticates a customer using encrypted password validation and returns session data.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: customer01
 *               password:
 *                 type: string
 *                 example: customerpass
 *     responses:
 *       200:
 *         description: Customer logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1001"
 *                     full_name:
 *                       type: string
 *                       example: "Jane Customer"
 *                     username:
 *                       type: string
 *                       example: customer01
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR...
 *       400:
 *         description: Missing username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: warning
 *                 message:
 *                   type: string
 *                   example: Username and password are required.
 *       401:
 *         description: Incorrect username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: warning
 *                 message:
 *                   type: string
 *                   example: Incorrect username or password.
 *       403:
 *         description: Account is inactive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: warning
 *                 message:
 *                   type: string
 *                   example: Account is inactive.
 *       500:
 *         description: Internal server error or session failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout user
 *     description: Destroys the user session and clears the session cookie.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Logged out successfully.
 *       500:
 *         description: Failed to logout due to server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Failed to logout.
 */

/**
 * @swagger
 * /session:
 *   get:
 *     summary: Get current user session
 *     description: Returns the logged-in user's session information if the user is logged in.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: User session found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   description: User session data
 *                   example:
 *                     id: "12345"
 *                     username: "johndoe"
 *                     fullname: "John Doe"
 *                     email: "john@example.com"
 *       401:
 *         description: Not logged in or session expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Not logged in.
 */

//#endregion


//#region Tickets

/**
 * @swagger
 * /customer_ticket/load-tickets:
 *   get:
 *     summary: Load Customer Tickets
 *     description: Retrieves all tickets submitted by the currently logged-in customer.
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: Tickets loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: TICK-202405230001
 *                       subject:
 *                         type: string
 *                         example: Internet not working
 *                       agent:
 *                         type: string
 *                         example: John Agent
 *                       created_at:
 *                         type: string
 *                         example: 2024-05-23 14:32:00
 *                       status:
 *                         type: string
 *                         example: REQUESTED
 *                       priority_level:
 *                         type: string
 *                         example: HIGH
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */

/**
 * @swagger
 * /customer_ticket/add-tickets:
 *   post:
 *     summary: Create a New Ticket
 *     description: Adds a new ticket for the authenticated customer with a unique generated ID.
 *     tags:
 *       - Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - description
 *             properties:
 *               subject:
 *                 type: string
 *                 example: "Internet not working"
 *               description:
 *                 type: string
 *                 example: "My internet has been down since last night."
 *     responses:
 *       200:
 *         description: Ticket created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: OK
 *       400:
 *         description: Invalid priority level or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: warning
 *                 message:
 *                   type: string
 *                   example: >
 *                     Invalid priority_level. Allowed values: LOW, MEDIUM, HIGH, PRIORITY.
 *       409:
 *         description: Ticket already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: warning
 *                 message:
 *                   type: string
 *                   example: Ticket already exists.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Internal server error.
 */


//#endregion
