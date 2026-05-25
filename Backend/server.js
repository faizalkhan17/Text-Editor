const app = require("./src/app")
const dotenv = require("dotenv")


dotenv.config()



app.listen(process.env.PORT, ()=>{
        console.log(`Server is connected to ${process.env.PORT} `)
})