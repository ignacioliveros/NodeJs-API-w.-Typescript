import * as mongoose from "mongoose";

export class DbContex {

    private connectionString: string = "mongodb://localhost/AppDb";
    connection = null;

    public open(callback) {
       const options = {};
       mongoose.connect(this.connectionString, options, (err) => {
           if (err) {
               console.log("mongoose.connect() failed: " + err);
           }
       });
       this.connection = mongoose.connection;

       mongoose.connection.on("error", (err) => {
           console.log("Error connecting to MongoDB: " + err);
           callback(err, false);
       });

       mongoose.connection.once("open", () => {
           console.log("We have connected to mongodb");
           callback(null, true);
       });

    }
}
