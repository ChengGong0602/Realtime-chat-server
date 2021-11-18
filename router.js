const express = require("express");
const router = express.Router();
const db = require('./data/db-config')

//for express rest API server
    router.use(express.json());
    router.use(express.urlencoded({extended: true}))
    //

const db_info_get = async function(room_name) {
    let room_data = await db.getRoom(room_name);
    return room_data;
}

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
});

router.get("/api", (req, res) => {
  res.send({ response: "Server is up and running at 50000." }).status(200);
});

router.post('/api/roomData', async function(req, res){
  try {
    let body = req.body;  // body parser middleware   
    let room_name  = body["room_name"]
    let roomdata = await db_info_get(room_name);       
    return res.status(200).send({ response: roomdata });
  } catch (err) {
    console.log("error==>:",err);
    return res.status(400).send({ msg: "something went wrong"})
  }
  
});
module.exports = router;