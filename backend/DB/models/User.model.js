
import { Schema,Types,model } from "mongoose";

const userSchema=new Schema({
    userName:{
        type: String,
			trim: true,
			required: [true, "name must be a required value"],
			min: [2, "too short name"],
            max: [20, "max length 20 name"],
            lowerCase:true

    },
    email:{
        type:String,
        required:true,
        unique: [true, "email must be a unique value"],
        lowerCase:true

    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'Admin',
        enum:['User','Admin']
    },
    status:{
        type:String,
        default:'Offline',
        enum:['Offline','Online']
    },
    gender:{
        type:String,
        default:'Male',
        enum:["Male","Female"]
        
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    code:{
        type:String,
    },
    age:String,
    mobileNumber:String,
    address:String,
    profileImage:Object,
    coverImage:[String],
    provider:{
        type:String,
        enum:["Google","System"],
        default:"System"
    },
    DOB:{
        type: Date,
    },
    wishList:[
        {
            type:Types.ObjectId,
            ref:"Product"
        }
    ],
},{
    timestamps:true
})

const userModel =model("User",userSchema)

export default userModel