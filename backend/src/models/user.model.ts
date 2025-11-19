import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema ({
    clerkId:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,  
        unique:true,
                
    },  
    username:{ 
        type:String,
        require:true
    },
    profileImgUrl:{
        type:String,
            default: 'https://placehold.co/200x200/5e5e5e/ffffff?text=User', // A default placeholder
    },
    memesCreated:[{
        type:Schema.Types.ObjectId,
       
    }],
    customTemplate:[{
        type:Schema.Types.ObjectId,
        
    }],
    favorites:[{  
        type:Schema.Types.ObjectId,
        
    }],
                      
    
},{
    timestamps:true
})

const User =mongoose.model("User",userSchema)

export default User;
