import { DbConnection } from "./db-connection";

class Test {
    async configureDb(){
        let dbConnection = new DbConnection();

        //await dbConnection.connect();

        // optional
        //await dbConnection.disconnect();
        
    }
}

new Test().configureDb();