import {app} from "./app.js"
import { connectDb } from "./data/user.js"



connectDb();
app.listen(process.env.PORT,() =>{
    console.log(`Server is running on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});