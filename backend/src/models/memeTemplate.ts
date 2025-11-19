import { Schema ,model } from "mongoose";


const memeTemplateSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
     // separate the  admin templates and the user templates 
     isAdminTemplate:{
        type:Boolean,
        default:false
     },
     // wheather the template  is allowed to be used by the users
     isAllowedForPublic:{
        type:Boolean,
        default:true,
     },


    
},{timestamps:true}
)

const MemeTemplate = model('MemeTemplate',memeTemplateSchema)

export default MemeTemplate;