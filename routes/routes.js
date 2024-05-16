const express =require('express')
const router = express.Router()
const usercontroller = require('../controller/user.controller')
const mailcontroller = require('../controller/mail.controller')
const verify = require('../util')
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The time the user was created
 *     Mail:
 *       type: object
 *       properties:
 *         from:
 *           type: string
 *           description: The sender's email
 *         to:
 *           type: string
 *           description: The recipient's email
 *         subject:
 *           type: string
 *           description: The mail subject
 *         content:
 *           type: string
 *           description: The mail body
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: The time the mail was sent
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/register', usercontroller.Register)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login', usercontroller.login)
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get authenticated user's information
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/user', verify ,usercontroller.getauthuser)
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out the user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post('/logout', usercontroller.logout)
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       404:
 *         description: User not found
 */
router.get('/user/:id', usercontroller.getuser)
/**
 * @swagger
 * /:
 *   post:
 *     summary: Verify user authentication
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 auth:
 *                   type: boolean
 *                   description: Authentication status
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.post('', verify , usercontroller.verifyAuthentication)
/**
 * @swagger
 * /sendmail:
 *   post:
 *     summary: Send a new mail
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               from:
 *                 type: string
 *               to:
 *                 type: string
 *               subject:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mail sent successfully
 *       400:
 *         description: Bad request
 */
router.post('/sendmail', verify , mailcontroller.sendmail)
/**
 * @swagger
 * /mymail:
 *   get:
 *     summary: Get authenticated user's mails
 *     tags: [Mail]
 *     responses:
 *       200:
 *         description: Mails retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/mymail', verify, mailcontroller.getauthusermail)
/**
 * @swagger
 * /status/{id}:
 *   put:
 *     summary: Update mail read status
 *     tags: [Mail]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The mail ID
 *     responses:
 *       200:
 *         description: Mail status updated successfully
 *       404:
 *         description: Mail not found
 */
router.put('/status/:id',verify, mailcontroller.updateread)
module.exports = router