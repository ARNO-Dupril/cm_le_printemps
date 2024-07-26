import { connect } from "mongoose";
export function mongoDbConnection(dbUrl) {
    try {
        connect(`${dbUrl}`);
        console.log("\n==============[ Connection a la base de donné reussi ]==============\n");
        // console.log("Connection a la base de donné reussi");
    } catch (err) {
        // console.log({error: err});
        console.log("Echec de connection a la base de donnée");
        this.mongoDbConnection();
    }
} 
