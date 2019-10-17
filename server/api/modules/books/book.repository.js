const mongoose=require('mongoose');

const BookSchema=mongoose.Schema({
    title:{type:String,
        required:true},
    category:{type:String,
        required:true},
    description:{type:String,
        },
    author:{type:String,
        required:true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
});

const BookModel=mongoose.model('Book',BookSchema);

const find=async function(query){
    const limit=Number(query.limit);
    const skip=Number(query.skip);
    delete query.limit;
    delete query.skip;
    if (query.limit&&query.skip!==undefined){
        return await BookModel.find(query).limit(limit).skip(skip);
    }else{
        return await BookModel.find(query);    
    }
}

const findByID=async function(id){
    const limit=Number(query.limit);
    const skip=Number(query.skip);
    delete query.limit;
    delete query.skip;
    if (query.limit&&query.skip!==undefined){
        return await BookModel.find(id).limit(limit).skip(skip);
    }else{
        return await BookModel.find(id);    
    }
}
const count=async function(query){
    return await BookModel.count(query);
}

const create=async function(data){
    const newDocument= new BookModel(data);
    return await newDocument.save();
}

const update=async function(id, data){
    return await BookModel.findByIdAndUpdate(id, {$set:data}, {new: true});
}

const deleteByID=async function(id){
    return await BookModel.findByIdAndDelete(id);
}

module.exports={
    find:find,
    findByID:findByID,
    create:create,
    update:update,
    delete:deleteByID,
    count:count
}