const mongoose=require("mongoose");
const schema=mongoose.Schema;
var fareSchema=new schema({
    pool:{
        perKM:{
            type:Number,
            
        },
        perMIN:{
            type:Number
        }
    },
    premier:{
        perKM:{
            type:Number
            
        },
        perMIN:{
            type:Number
        }
    },
    xl:{
        perKM:{
            type:Number
            
        },
        perMIN:{
            type:String
        }
    }
})

module.exports = mongoose.model("fare",fareSchema);