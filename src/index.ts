import "reflect-metadata";
import {createConnection} from "typeorm";
import app from "./app";

createConnection().then(async connection => {
    app.listen(3333)
    
}).catch(error => console.log(error));
