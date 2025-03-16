import { model, Schema, Types } from "mongoose";

export const interviewSchema = new Schema({
    domain:{
        type:String
    },
    experience_years:{
        type:String
    },
    projects:[
        {type:String}
    ],
    skills:[{type:String}],

    interviewQA:[{
        difficulty:{
            type:String
        },
        number:{
            type:Number
        },
        question:{
            type:String
        } ,
        answer:{
            type:String,
            default:'not answered yet'
        },
        status:{
            type:String,
            default:'not signed'
        },
        resource:{
            type:String
        }
    }],
    score:{
        type:Number,
    },
    userId:{
        type :Types.ObjectId,
        required : true ,
        ref:"Users"
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    report:{
        type:String
    },
    total_score:{
        type:String
    }
})




export const interviewModel = model('Interview' , interviewSchema)