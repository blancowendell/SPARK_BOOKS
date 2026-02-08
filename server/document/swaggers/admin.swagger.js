
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerAdmin = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SERVICE LINK API Documentation",
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
  apis: ["./document/swaggers/admin.swagger.js"],
};

const swaggerDocsAdmin = swaggerJsDoc(swaggerAdmin);
module.exports = swaggerDocsAdmin;


//#region Auth

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Admin Login
 *     description: Authenticates a user using encrypted password validation and returns their session data.
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
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                       example: "1"
 *                     employee_id:
 *                       type: string
 *                       example: "EMP001"
 *                     fullname:
 *                       type: string
 *                       example: "John Doe"
 *                     username:
 *                       type: string
 *                       example: johndoe
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
 * /customer-login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Customer login
 *     description: Login endpoint for customers to authenticate and receive a session with a token.
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
 *                 example: customer123
 *               password:
 *                 type: string
 *                 example: pass123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: CUST001
 *                     fullname:
 *                       type: string
 *                       example: John Doe
 *                     username:
 *                       type: string
 *                       example: customer123
 *                     access_type:
 *                       type: string
 *                       example: Customer
 *                     ticket_level:
 *                       type: string
 *                       example: 1
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing username or password
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
 *                   example: Username and password are required.
 *       401:
 *         description: Incorrect credentials
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
 *                   example: Incorrect username or password.
 *       403:
 *         description: Inactive account
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
 *                   example: Account is inactive.
 *       500:
 *         description: Server error
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
 *                   example: Internal Server Error
 */

/**
 * @swagger
 * /owner-login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Company owner login
 *     description: Login endpoint for company owners to authenticate and receive a session with a token.
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
 *                 example: owner123
 *               password:
 *                 type: string
 *                 example: ownerpass
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: OWNER001
 *                     fullname:
 *                       type: string
 *                       example: Jane Smith
 *                     username:
 *                       type: string
 *                       example: owner123
 *                     access_type:
 *                       type: string
 *                       example: CompanyOwner
 *                     ticket_level:
 *                       type: string
 *                       example: 2
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing username or password
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
 *                   example: Username and password are required.
 *       401:
 *         description: Incorrect credentials
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
 *                   example: Incorrect username or password.
 *       403:
 *         description: Inactive account
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
 *                   example: Account is inactive.
 *       500:
 *         description: Server error
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
 *                   example: Internal Server Error
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

//#region Agent

/**
 * @swagger
 * /agent/load-agent:
 *   get:
 *     tags:
 *       - Agents
 *     summary: Load agent users
 *     description: Retrieve all agent users from the master_agent_user table.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of agent users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Data fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 101
 *                       fullname:
 *                         type: string
 *                         example: "Agent John Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */


//#endregion

//#region Dashboard

/**
 * @swagger
 * /dashboard/load-layout:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Load dashboard layout and widget configurations
 *     description: Retrieve all widgets and their configurations for a specific dashboard.
 *     responses:
 *       200:
 *         description: Successful response with widget layout and config data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 37
 *                       dashboard_id:
 *                         type: integer
 *                         example: 1
 *                       widget_type:
 *                         type: string
 *                         example: "card"
 *                       widget_title:
 *                         type: string
 *                         example: "Card 1"
 *                       x:
 *                         type: integer
 *                         example: 0
 *                       y:
 *                         type: integer
 *                         example: 20
 *                       width:
 *                         type: integer
 *                         example: 321
 *                       height:
 *                         type: integer
 *                         example: 160
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-24T18:18:28.000Z"
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-07-24T18:18:28.000Z"
 *                       config_id:
 *                         type: integer
 *                         example: 1
 *                       widget_id:
 *                         type: integer
 *                         example: 37
 *                       layout_type:
 *                         type: string
 *                         example: "default"
 *                       config_json:
 *                         type: string
 *                         example: "{}"
 *       500:
 *         description: Server Error
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
 *                   example: "Internal Server Error"
 */


//#endregion

//#region Masters

/**
 * @swagger
 * /concern_category/load-category:
 *   get:
 *     tags:
 *       - Masters
 *     summary: Load all categories
 *     description: Retrieve all concern categories from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with category data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       cat_id:
 *                         type: integer
 *                         example: 1
 *                       cat_name:
 *                         type: string
 *                         example: "Technical Issue"
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Token is missing or invalid"
 *       500:
 *         description: Server Error
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
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /concern_category/add-category:
 *   post:
 *     summary: Add a new category
 *     tags:
 *       - Masters
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - description
 *             properties:
 *               code:
 *                 type: string
 *                 example: "CAT001"
 *               description:
 *                 type: string
 *                 example: "Category description"
 *     responses:
 *       200:
 *         description: Category added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category created"
 *       500:
 *         description: Server error or validation failure
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /sub_category/load-sub-category:
 *   get:
 *     summary: Get all subcategories
 *     tags:
 *       - Masters
 *     responses:
 *       200:
 *         description: List of subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 message:
 *                   type: string
 *                   example: "Data retrieved"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /sub_category/add-sub-category:
 *   post:
 *     summary: Add a new subcategory
 *     tags:
 *       - Masters
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - description
 *             properties:
 *               code:
 *                 type: string
 *                 example: "SC001"
 *               description:
 *                 type: string
 *                 example: "Subcategory description"
 *     responses:
 *       200:
 *         description: Subcategory added or already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               oneOf:
 *                 - properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Subcategory created"
 *                 - properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "Record already exists"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /sub_category/get-sub-category:
 *   post:
 *     summary: Retrieve a sub-category by subcategory ID.
 *     tags:
 *       - Masters
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - subcategory_id
 *             properties:
 *               subcategory_id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: Successfully retrieved the sub-category data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "SUBC202405001"
 *                       code:
 *                         type: string
 *                         example: "CAT001"
 *                       code_id:
 *                         type: string
 *                         example: "CATID001"
 *                       description:
 *                         type: string
 *                         example: "Login Issues"
 *                       status:
 *                         type: string
 *                         example: "active"
 *                 msg:
 *                   type: string
 *                   example: success
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /sub_category/edit-sub-category:
 *   put:
 *     summary: Edit a subcategory
 *     tags:
 *       - Masters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - code
 *               - description
 *               - status
 *             properties:
 *               id:
 *                 type: string
 *                 example: "mcs_0001"
 *               code:
 *                 type: string
 *                 example: "SC002"
 *               description:
 *                 type: string
 *                 example: "Updated subcategory description"
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *                 example: "ACTIVE"
 *     responses:
 *       200:
 *         description: Subcategory updated or already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               oneOf:
 *                 - properties:
 *                     success:
 *                       type: boolean
 *                       example: true
 *                     message:
 *                       type: string
 *                       example: "Subcategory updated"
 *                 - properties:
 *                     success:
 *                       type: boolean
 *                       example: false
 *                     message:
 *                       type: string
 *                       example: "Record already exists"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

//#endregion

//#region Customers

/**
 * @swagger
 * /customers/load-customers:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Load all customers
 *     description: Retrieve all customers from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with customer data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       customer_id:
 *                         type: integer
 *                         example: 101
 *                       customer_name:
 *                         type: string
 *                         example: "John Doe"
 *                       customer_email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Token is missing or invalid"
 *       500:
 *         description: Server Error
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
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /customers/add-customers:
 *   post:
 *     tags:
 *       - Customers
 *     summary: Add a new customer
 *     description: Insert a new customer into the database after checking for duplicates.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - last_name
 *               - email
 *               - phone
 *               - address
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Springfield"
 *     responses:
 *       200:
 *         description: Customer added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully inserted"
 *       409:
 *         description: Customer already exists
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
 *                   example: "Already exists"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /customers/get-customers:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get customer by ID
 *     description: Retrieve a specific customer by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: Customer_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the customer to retrieve.
 *     responses:
 *       200:
 *         description: Successful response with customer data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "CUS001"
 *                       first_name:
 *                         type: string
 *                         example: "John"
 *                       last_name:
 *                         type: string
 *                         example: "Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       phone:
 *                         type: string
 *                         example: "09123456789"
 *                       address:
 *                         type: string
 *                         example: "123 Main St"
 *       400:
 *         description: Bad Request - Missing Customer_id query parameter
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
 *                   example: "Customer_id is required"
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Token is missing or invalid"
 *       500:
 *         description: Server Error
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
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /customers/edit-customers:
 *   put:
 *     tags:
 *       - Customers
 *     summary: Edit customer details
 *     description: Update an existing customer in the database after checking for duplicates.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - first_name
 *               - last_name
 *               - email
 *               - phone
 *               - address
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 101
 *               first_name:
 *                 type: string
 *                 example: "John"
 *               last_name:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               address:
 *                 type: string
 *                 example: "123 Main St, Springfield"
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully updated"
 *       409:
 *         description: Customer already exists
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
 *                   example: "Already exists"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /customer_ticket/customer-ticket-details/{ticket_id}:
 *   get:
 *     tags:
 *       - Customers
 *     summary: Get ticket details with attachments and comments
 *     description: Retrieve a ticket’s details, related tickets, file attachments, and comments by ticket ID.
 *     parameters:
 *       - in: path
 *         name: ticket_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the ticket to retrieve (e.g., IR202506000001).
 *     responses:
 *       200:
 *         description: Ticket details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     ticket:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: IR202506000001
 *                         customer:
 *                           type: string
 *                           example: John Doe
 *                         customer_id:
 *                           type: string
 *                           example: CUST123
 *                         subject:
 *                           type: string
 *                           example: Login Issue
 *                         description:
 *                           type: string
 *                           example: Cannot log in to the system.
 *                         agent:
 *                           type: string
 *                           example: Jane Smith
 *                         agent_id:
 *                           type: string
 *                           example: AGENT456
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                           example: 2025-06-10 12:45:00
 *                         status:
 *                           type: string
 *                           example: Open
 *                         priority_level:
 *                           type: string
 *                           example: High
 *                         category_id:
 *                           type: string
 *                           example: CAT001
 *                         sub_category_id:
 *                           type: string
 *                           example: SUBCAT001
 *                         parent_ticket_id:
 *                           type: string
 *                           nullable: true
 *                           example: null
 *                     attachments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           tfa_id:
 *                             type: integer
 *                             example: 1
 *                           tfa_file_name:
 *                             type: string
 *                             example: screenshot.png
 *                           tfa_mime_type:
 *                             type: string
 *                             example: image/png
 *                           tfa_base64_content:
 *                             type: string
 *                           tfa_uploaded_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-06-10 13:00:00
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           tc_id:
 *                             type: integer
 *                             example: 1
 *                           tc_description:
 *                             type: string
 *                             example: Reproduced the issue.
 *                           tc_access_type:
 *                             type: string
 *                             example: Public
 *                           tc_fullname:
 *                             type: string
 *                             example: Jane Smith
 *                           tc_file:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           tc_created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-06-10 13:10:00
 *                           t_parent_ticket_id:
 *                             type: string
 *                             example: IR202506000001
 *       404:
 *         description: Ticket not found
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
 *                   example: Ticket not found
 *       500:
 *         description: Internal server error
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
 *                   example: Internal Server Error
 */

//#endregion

//#region Owners

/**
 * @swagger
 * /owners/load-owners:
 *   get:
 *     tags:
 *       - Owners
 *     summary: Load all owners
 *     description: Retrieve all owners from the database.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response with owner data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       owner_id:
 *                         type: integer
 *                         example: 1
 *                       owner_name:
 *                         type: string
 *                         example: "Jane Smith"
 *                       owner_email:
 *                         type: string
 *                         example: "jane.smith@example.com"
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Token is missing or invalid"
 *       500:
 *         description: Server Error
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
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /owners/add-owners:
 *   post:
 *     tags:
 *       - Owners
 *     summary: Add a new owner
 *     description: Create a new owner with generated credentials.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *                 example: "Acme Corporation"
 *               owner_name:
 *                 type: string
 *                 example: "Jane Smith"
 *     responses:
 *       200:
 *         description: Owner successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully processed"
 *       409:
 *         description: Conflict - Owner already exists
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
 *                   example: "Data already exists"
 *       500:
 *         description: Server Error or credential generation failure
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
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /owners/edit-owners:
 *   put:
 *     tags:
 *       - Owners
 *     summary: Edit an existing owner
 *     description: Update company name, owner name, or status for a given owner.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               company_name:
 *                 type: string
 *                 example: "New Company Name"
 *               owner_name:
 *                 type: string
 *                 example: "Updated Owner Name"
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *                 example: "ACTIVE"
 *     responses:
 *       200:
 *         description: Owner successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successfully processed"
 *       409:
 *         description: Conflict - Duplicate owner data
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
 *                   example: "Data already exists"
 *       500:
 *         description: Server Error during update
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
 *                   example: "Internal Server Error"
 */

//#endregion

//#region Tickets

/**
 * @swagger
 * /tickets/load-tickets:
 *   get:
 *     tags:
 *       - Tickets
 *     summary: Load all tickets
 *     description: Fetches a list of all tickets with customer and agent names.
 *     responses:
 *       200:
 *         description: List of tickets loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       customer:
 *                         type: string
 *                         example: "Jane Doe"
 *                       agent:
 *                         type: string
 *                         example: "Agent Smith"
 *                       created_at:
 *                         type: string
 *                         example: "2025-05-20 10:00:00"
 *                       status:
 *                         type: string
 *                         example: "ACTIVE"
 *                       priority_level:
 *                         type: string
 *                         example: "HIGH"
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /tickets/add-tickets:
 *   post:
 *     tags:
 *       - Tickets
 *     summary: Add a new ticket
 *     description: Adds a new ticket to the system after checking for duplicates and validating priority level.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - customer_id
 *               - agent_id
 *               - subject
 *               - description
 *               - priority_level
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 5
 *               agent_id:
 *                 type: integer
 *                 example: 2
 *               subject:
 *                 type: string
 *                 example: "Login not working"
 *               description:
 *                 type: string
 *                 example: "Customer is unable to login with correct credentials."
 *               priority_level:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH, PRIORITY]
 *                 example: "HIGH"
 *     responses:
 *       200:
 *         description: Ticket added successfully
 *       400:
 *         description: Invalid priority_level
 *       409:
 *         description: Ticket already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /tickets/get-tickets:
 *   post:
 *     summary: Retrieve a ticket by ticket ID.
 *     tags:
 *       - Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - ticket_id
 *             properties:
 *               ticket_id:
 *                 type: string
 *                 example: "3"
 *     responses:
 *       200:
 *         description: Successfully retrieved the ticket data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "TKT202405001"
 *                       customer:
 *                         type: string
 *                         example: "John Doe"
 *                       customer_id:
 *                         type: string
 *                         example: "CUST202405001"
 *                       subject:
 *                         type: string
 *                         example: "Cannot login to dashboard"
 *                       agent:
 *                         type: string
 *                         example: "Agent Smith"
 *                       agent_id:
 *                         type: string
 *                         example: "AGT202405001"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-05-01 14:35:00"
 *                       status:
 *                         type: string
 *                         example: "open"
 *                       priority_level:
 *                         type: string
 *                         example: "high"
 *                 msg:
 *                   type: string
 *                   example: success
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /tickets/edit-tickets:
 *   put:
 *     tags:
 *       - Tickets
 *     summary: Edit ticket details
 *     description: Updates an existing ticket after validation and duplicate checking.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - agent_id
 *               - subject
 *               - description
 *               - status
 *               - priority_level
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 10
 *               agent_id:
 *                 type: integer
 *                 example: 2
 *               subject:
 *                 type: string
 *                 example: "App crashes on login"
 *               description:
 *                 type: string
 *                 example: "App crashes when entering credentials on Android."
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, TRANSFER, RESOLVED]
 *                 example: "PRIORITY"
 *               priority_level:
 *                 type: string
 *                 enum: [LOW, MEDIUM, HIGH, PRIORITY]
 *                 example: "HIGH"
 *     responses:
 *       200:
 *         description: Ticket updated successfully
 *       400:
 *         description: Invalid status
 *       409:
 *         description: Ticket already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /tickets/load-ticket-details/{ticket_id}:
 *   get:
 *     tags:
 *       - Tickets
 *     summary: Get full ticket details including attachments and comments
 *     description: Returns ticket details with associated files and comments based on the provided ticket ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: ticket_id
 *         in: path
 *         required: true
 *         description: Ticket ID to retrieve
 *         schema:
 *           type: string
 *           example: TICK001
 *     responses:
 *       200:
 *         description: Ticket details loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     ticket:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: TICK001
 *                         customer:
 *                           type: string
 *                           example: John Doe
 *                         subject:
 *                           type: string
 *                           example: "Printer issue"
 *                         description:
 *                           type: string
 *                           example: "The printer is not responding"
 *                         agent:
 *                           type: string
 *                           example: Agent Smith
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                           example: 2025-05-26 10:30:00
 *                         status:
 *                           type: string
 *                           enum: [ACTIVE, TRANSFER, RESOLVED, REQUESTED]
 *                         priority_level:
 *                           type: string
 *                           enum: [LOW, MEDIUM, HIGH, PRIORITY]
 *                     attachments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           tfa_id:
 *                             type: integer
 *                             example: 1
 *                           tfa_file_name:
 *                             type: string
 *                             example: screenshot1.png
 *                           tfa_mime_type:
 *                             type: string
 *                             example: image/png
 *                           tfa_base64_content:
 *                             type: string
 *                             example: base64encodeddata==
 *                           tfa_uploaded_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-05-25 14:30:00
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           tc_id:
 *                             type: integer
 *                             example: 10
 *                           tc_description:
 *                             type: string
 *                             example: "Investigating issue..."
 *                           tc_created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2025-05-25 14:45:00
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /tickets/add-comment:
 *   post:
 *     tags:
 *       - Tickets
 *     summary: Add a comment to a ticket
 *     description: Adds a new comment to the specified ticket along with the user information from session.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - ticket_id
 *               - description
 *             properties:
 *               ticket_id:
 *                 type: string
 *                 example: TICK001
 *               description:
 *                 type: string
 *                 example: "Started investigating the network issue"
 *               file:
 *                 type: string
 *                 example: "Base64 encoded file content"
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *       400:
 *         description: Bad Request - Missing or invalid input
 *       409:
 *         description: Comment already exists
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
 *                   example: Data already exists
 *       500:
 *         description: Internal Server Error
 */


//#endregion

//#region Maintenance Sequence

/**
 * @swagger
 * /maintenance_sequence/load-sequence:
 *   get:
 *     tags:
 *       - Maintenance Sequence
 *     summary: Load all maintenance sequences
 *     description: Fetches a list of all maintenance sequences with data modeling applied.
 *     responses:
 *       200:
 *         description: List of maintenance sequences loaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       ticket_level:
 *                         type: string
 *                         example: "Level 1"
 *                       prefix:
 *                         type: string
 *                         example: "TCK"
 *                       separator:
 *                         type: string
 *                         example: "-"
 *                       start_number:
 *                         type: integer
 *                         example: 100
 *                       padding_length:
 *                         type: integer
 *                         example: 5
 *                       include_year:
 *                         type: boolean
 *                         example: true
 *                       include_month:
 *                         type: boolean
 *                         example: true
 *                       include_day:
 *                         type: boolean
 *                         example: false
 *                       create_at:
 *                         type: string
 *                         example: "2025-05-20 10:00:00"
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /maintenance_sequence/add-sequence:
 *   post:
 *     tags:
 *       - Maintenance Sequence
 *     summary: Add a new maintenance sequence
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               ticket_level:
 *                 type: string
 *                 example: "Level 1"
 *               prefix:
 *                 type: string
 *                 example: "TCK"
 *               seperator:
 *                 type: string
 *                 example: "-"
 *               start_number:
 *                 type: integer
 *                 example: 100
 *               padding_length:
 *                 type: integer
 *                 example: 5
 *               include_year:
 *                 type: boolean
 *                 example: true
 *               include_month:
 *                 type: boolean
 *                 example: true
 *               include_day:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Maintenance sequence added successfully or already exists
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /maintenance_sequence/get-sequence:
 *   post:
 *     tags:
 *       - Maintenance Sequence
 *     summary: Get a specific maintenance sequence by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "1"
 *     responses:
 *       200:
 *         description: Maintenance sequence retrieved successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /maintenance_sequence/edit-sequence:
 *   put:
 *     tags:
 *       - Maintenance Sequence
 *     summary: Edit padding length of a maintenance sequence
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "1"
 *               padding_length:
 *                 type: integer
 *                 example: 6
 *     responses:
 *       200:
 *         description: Maintenance sequence updated successfully or already exists
 *       500:
 *         description: Internal Server Error
 */


//#endregion

//#region Maintenance Users

/**
 * @swagger
 * /maintenance_users/load-maintenance-users:
 *   get:
 *     tags:
 *       - Maintenance Users
 *     summary: Load all maintenance users
 *     description: Retrieve all maintenance users joined with their sequence data.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved maintenance users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: "johndoe"
 *                       prefix:
 *                         type: string
 *                         example: "MT-001"
 *                       status:
 *                         type: string
 *                         example: "Active"
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /maintenance_users/add-maintenance-users:
 *   post:
 *     tags:
 *       - Maintenance Users
 *     summary: Add a new maintenance user
 *     description: Create a new maintenance user entry in the database.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - ticket_sequence_id
 *               - username
 *               - password
 *             properties:
 *               ticket_sequence_id:
 *                 type: integer
 *                 example: 2
 *               username:
 *                 type: string
 *                 example: "newuser"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Successfully created user
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /maintenance_users/get-maintenance-users:
 *   post:
 *     tags:
 *       - Maintenance Users
 *     summary: Get a single maintenance user by ID
 *     description: Retrieve a maintenance user by their ID.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved user data
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /maintenance_users/edit-maintenance-users:
 *   put:
 *     tags:
 *       - Maintenance Users
 *     summary: Edit an existing maintenance user
 *     description: Update details of an existing maintenance user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - ticket_sequence_id
 *               - username
 *               - status
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               ticket_sequence_id:
 *                 type: integer
 *                 example: 2
 *               username:
 *                 type: string
 *                 example: "updateduser"
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE]
 *                 example: "ACTIVE"
 *     responses:
 *       200:
 *         description: Successfully updated user
 *       400:
 *         description: Duplicate user exists
 *       500:
 *         description: Server Error
 */

//#endregion

//#region Maintenance API

/**
 * @swagger
 * /maintenance_api/load-api-list:
 *   get:
 *     tags:
 *       - Maintenance API
 *     summary: Load all APIs
 *     description: Retrieve all APIs from the maintenance API list.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved list of APIs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Get Users"
 *                       apiUrl:
 *                         type: string
 *                         example: "/users/list"
 *                       description:
 *                         type: string
 *                         example: "Fetch all users"
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /maintenance_api/add-api:
 *   post:
 *     tags:
 *       - Maintenance API
 *     summary: Add a new API
 *     description: Add a new API entry into the maintenance API table.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - apiUrl
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Get Users"
 *               apiUrl:
 *                 type: string
 *                 example: "/users/list"
 *               description:
 *                 type: string
 *                 example: "Fetch all users"
 *     responses:
 *       200:
 *         description: API successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Required fields are missing.
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
 *                   example: "Name, API URL, and Description are required."
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /maintenance_api/get-api/{id}:
 *   get:
 *     tags:
 *       - Maintenance API
 *     summary: Get a specific API by ID
 *     description: Retrieve a single API entry from the maintenance API table by its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the API to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved API entry.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Get Users"
 *                     apiUrl:
 *                       type: string
 *                       example: "/users/list"
 *                     description:
 *                       type: string
 *                       example: "Fetch all users"
 *       404:
 *         description: API entry not found.
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
 *                   example: "API entry not found."
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /maintenance_api/edit-api:
 *   put:
 *     tags:
 *       - Maintenance API
 *     summary: Edit an existing API
 *     description: Edit an API entry by ID.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - apiUrl
 *               - description
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: "Get Users"
 *               apiUrl:
 *                 type: string
 *                 example: "/users/list"
 *               description:
 *                 type: string
 *                 example: "Fetch all users"
 *     responses:
 *       200:
 *         description: API successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Required fields are missing or duplicate exists.
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
 *                   example: "API with the same name and description already exists."
 *       500:
 *         description: Server Error
 */


//#endregion

//#region DEV TOOLS

//#region API

//#endregion

//#region DASHBOARD

/**
 * @swagger
 * /maintenance_dashboard/load-dashboard-owner:
 *   get:
 *     tags:
 *       - Dev Tools - Dashboard
 *     summary: Load all dashboard owners
 *     description: Retrieve all dashboard owner records from the maintenance dashboards table.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved dashboard owners.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       user_id:
 *                         type: integer
 *                         example: 9
 *                       dashboard_name:
 *                         type: string
 *                         example: "Main Dashboard"
 *                       created_by:
 *                         type: string
 *                         example: "admin"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-07-29T10:30:00Z"
 *       500:
 *         description: Server Error
 */


//#endregion

//#endregion