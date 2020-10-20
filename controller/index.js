const Fare=require("../model/index");
const { init } = require("../model/index");
const distance=require("google-distance-matrix");

exports.setFare=(req,res)=>{
    const fare=new Fare(req.body);
    
    fare.save((error,fare)=>{
        if(error){
            return res.status(400).json({
                error:"Error! Please enter correct value."
            })
        }
        res.json({fare});
    })
}



exports.getFare=(req,res)=>{
    
    var distanceValue=null;
    var durationValue=null;
    const {initial,destination}=req.body;

    //Lattitude and Longitude
    var origins = [`${initial.lati},${initial.long}`];
    var destinations = [`${destination.lati},${destination.long}`];
    
    
    distance.key('AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ');
    distance.units('imperial');
    
    
    distance.matrix(origins, destinations, function (err, distances) {
        if (err) {
            return console.log(err);
        }
        if(!distances) {
            return console.log('no distances');
        }
        if (distances.status == 'OK') {
            for (var i=0; i < origins.length; i++) {
                for (var j = 0; j < destinations.length; j++) {
                    if (distances.rows[0].elements[j].status == 'OK') {
                        var distanceValue = Math.ceil(distances.rows[i].elements[j].distance.value/1000);
                        var durationValue = Math.ceil(distances.rows[i].elements[j].duration.value/60);
                    } else {
                        res.send({
                            message:"Destination is not reachable by land"
                        })
                    }
                }
            }

            Fare.find().exec((err,fare)=>{
                if(err){
                    res.status(400).send({
                        error:"Can't fetch the fare."
                    })
                }
                res.send({
                    pool:{
                        distanceFare:parseFloat(fare[0].pool.perKM*distanceValue).toFixed(2),
                        timeFare:parseFloat(fare[0].pool.perMIN*durationValue).toFixed(2)
                    },
                    premier:{
                        distanceFare:parseFloat(fare[0].premier.perKM*distanceValue).toFixed(2),
                        timeFare:parseFloat(fare[0].premier.perMIN*durationValue).toFixed(2)
                    },
                    xl:{
                        distanceFare:parseFloat(fare[0].xl.perKM*distanceValue).toFixed(2),
                        timeFare:parseFloat(fare[0].xl.perMIN*durationValue).toFixed(2),
                    }
                })
            })
        }
    });

    
}
