
import mongoose from 'mongoose'
const Connection=(username,password)=>{
//mongodb://TechnophileFirdous:Technophile@1234@ac-k5g9okb-shard-00-00.kzuwf7d.mongodb.net:27017,ac-k5g9okb-shard-00-01.kzuwf7d.mongodb.net:27017,ac-k5g9okb-shard-00-02.kzuwf7d.mongodb.net:27017/?ssl=true&replicaSet=atlas-xjy27e-shard-0&authSource=admin&retryWrites=true&w=majority
mongoose.connect(`mongodb://${username}:${password}@ac-fk9aytp-shard-00-00.zcsbvvc.mongodb.net:27017,ac-fk9aytp-shard-00-01.zcsbvvc.mongodb.net:27017,ac-fk9aytp-shard-00-02.zcsbvvc.mongodb.net:27017/?ssl=true&replicaSet=atlas-dzdk6r-shard-0&authSource=admin&retryWrites=true&w=majority`
,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=> {
  console.log("Connected successfully ");
});

}
export default Connection;