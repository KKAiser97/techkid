const repository=require('./user.repository.js')

const find=async function(query){
    // check authentication, authorization
    // validate query
    // do business logic
    // persist db
    // return await repository.find(query);
    const data=await repository.find(query);
    const count=await repository.count(query);
    return {
        data:data,
        count:count
    };
}

const findByID=async function(id){
    return await repository.findByID(id);
}

const create=async function(data){
    if(!data.name||!data.email){
        throw new Error("Missing input!");
    }
    if (validateEmail(data.email)){
        throw new Error("Invalid value!");
    }
    return await repository.create(data);
}

const update=async function(id, data){
    const existedRecord=await repository.findByID(id);
    if(!existedRecord){
        throw new Error("Entity not found!");
    }
    return await repository.update(id, data);
}

const deleteByID= async function(id){
    const existedRecord=await repository.findByID(id);
    if(!existedRecord){
        throw new Error("Entity not found!");
    }
    return await repository.delete(id, data);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports={
    find:find,
    findByID:findByID,
    create:create,
    update:update,
    delete:deleteByID
};