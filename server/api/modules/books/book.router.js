const express=require('express');
const router=express.Router();
const service=require('./book.service');
const authService=require('../auth/auth.service');

router.get('/', authService.authentication, async function(req, res){
    try{
    const data=await service.find(req.query);
    res.status(201).send({
        data:data,
    });
}catch(err){
    res.status(500).send({
        error:err.message,
        
    })
}
});
router.get('/', async function(req, res){
    try{
        const data=await service.findByID(req.params.id);
        res.status(201).send({
            data:data,
        });
    }catch(err){
        res.status(500).send({
            error:err.message,
        })
    }
});
router.post('/', async function(req, res){
    try{
    const data=await service.create(req.body);
    res.status(201).send({
        data:data,
    });
}catch(err){
    res.status(500).send({
        error:err.message,
        
    });
}
})
router.put('/:id', async function(req, res){
    try{
    const data=await service.update(req.params.id, req.body,{new:true});
    res.status(201).send({
        data:data,
    });
}catch(err){
    res.status(500).send({
        error:err.message,
        
    });
}
})
router.delete('/:id', async function(req, res){
    try{
    const data=await service.delete(req.params.id);
    res.status(201).send({
        data:data,
    });
}catch(err){
    res.status(500).send({
        error:err.message,
        
    });
}
})
module.exports=router;