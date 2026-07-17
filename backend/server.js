const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const cors = require("cors");
const testRoutes = require("./routes/testRoutes")
const authRoutes = require("./routes/authRoutes")
const logger = require("./middleware/logger")
const trafficMonitor = require("./middleware/trafficMonitor")
const connectDB = require("./config/db")
const User = require("./models/User")
const protectedRoutes = require("./routes/protectedRoutes")
const noteRoutes = require("./routes/noteRoutes")

connectDB()

const app = express()
app.use(express.json())
app.use(logger)
app.use(trafficMonitor)
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  exposedHeaders: ["X-High-Traffic", "X-Request-Count"]
}));

app.use("/api/notes",noteRoutes)
app.use("/api",protectedRoutes)
app.use("/api",testRoutes)
app.use("/api/auth",authRoutes)



const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})

