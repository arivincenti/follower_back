import Mongoose from "mongoose";

export default class Database {
    private URI: string = "mongodb://localhost:27017/follower";

    constructor() {
        this.settings();
        this.connect();
    }

    async connect() {
        try {
            await Mongoose.connect(this.URI);
            console.log(this.URI);
            console.log("Base de datos conectada");
        } catch (error) {
            console.log(error);
        }
    }

    settings() {
        Mongoose.set("useFindAndModify", false);
        Mongoose.set("useCreateIndex", true);
        Mongoose.set("useNewUrlParser", true);
        Mongoose.set("useUnifiedTopology", true);
    }
}
