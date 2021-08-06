// Write your "actions" router here!
const express = require('express');

const Action = require("./actions-model")

const router= express.Router()

//GET
router.get('/',async (req,res)=>{
    const actions = await Action.get()
    res.json(actions)
})
//Get with ID
router.get('/:id',async(req,res)=>{
    const{id}=req.params
    try{
        const action= await Action.get(id);
        if(!action){
            res.status(404).json({message:"This is not an ID"})
        }else{
            res.json(action)
        }
    }catch{
        res.status(500).json({message:"ERROR NOOOO!!!"})
    }    
})
//POST
router.post('/',async (req,res)=>{
    const {description,notes} = req.body;
    try{
        if(!notes || !description){
            res.status(400).json({message:'please provide notes and description for the project'})
        }else{
            console.log(req.body)
            const actions = await Action.insert(req.body)
            res.status(200).json(actions)
        }
    }catch(err){
        res.status(500).json({message:"no server"})
    }
})
//PUT ID
router.put('/:id',async(req,res)=>{
    const {id} = req.params
    const {description,notes,project_id } = req.body;
    try{
        const action= await Action.get(id);
        if(!notes || !description || !project_id ){
            res.status(400).json({message:'please provide notes, description for the project'})
        }else{
            if(!action){
                res.status(404).json({message:"This is not an ID"})
            }else{ 
                const updatedAction = await Action.update(id,req.body)
                res.json(updatedAction)
            }
        }
    }catch(err){
        res.status(500).json({message:"no server"})
    }
})

router.delete('/:id', async (req,res)=>{
    const {id} = req.params
    const action= await Action.get(id)
    try{
        if(!action){
            res.status(404).json({message:"could not find that ID "})
        }else{
            await Action.remove(req.params.id)
            res.json()
        }
    }catch(err){
        res.status(500).json({message:"Mean Error"})
    }
})


module.exports = router
