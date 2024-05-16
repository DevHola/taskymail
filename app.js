const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config()
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const app = express()
const allowedOrigin = process.env.ALLOWED_ORIGIN;
//https://taskymail-frontend.onrender.com
app.use(cors({ 
    origin: ["https://taskymail-frontend.onrender.com", "http://localhost:3000"], // Allow requests from localhost and example.com
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true 
}));

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("combined"))
app.use(cookieParser())
const connect = require('./connect')
const routes = require('./routes/routes')
app.use('/api',routes)

app.use((error, req, res, next)=>{
    res.status(500).json({
        error: error.message,
        message: 'Something went wrong',
        status:false

    })
})

const swaggerOptions  = {
    definition: {
        openapi:'3.0.1',
        info:{
            title: 'Mailbox Backend',
            version: '1.0',
            description: 'API for a mail inbox application'
        },
        servers: [
            {
                url:'https://taskymail.onrender.com/api',
                description: 'Render server'
            }
        ],
    },
    apis: ['./routes/*.js'], 
}
const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(process.env.PORT,() => {
    connect()
    console.log(`Server Running on port ${process.env.PORT}`)
})