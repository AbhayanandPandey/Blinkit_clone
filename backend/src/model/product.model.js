import mongoose from "mongoose";

const productSchems = new mongoose.Schema({
    name:{
        type:String,
        default:'',
    },
    image:{
        type:Array,
        default: []
    },
    category:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'category'
        }
    ],
    subCategory:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'subCategory'
        }
    ],
    unit:{
        type:String,
        default:''
    },
    stock:{
        type:Number,
        default:null
    },
    price:{
        type:Number,
        default:null
    },
    discount:{
        type:Number,
        default:null
    },
    description:{
        type:String,
        default:''
    },
    more_details:{
        type:Object,
        default:{}
    },
    publish:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
})

productSchems.index({name:'text',description:'text'},{
    name:10,
    description:5,
})


const ProductModel = mongoose.model('product',productSchems)
export default ProductModel