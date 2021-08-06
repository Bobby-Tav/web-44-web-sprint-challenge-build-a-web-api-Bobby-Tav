// Write your "projects" router here!
const express = require('express');

const Projects = require("./projects-model")

const router= express.Router()
//GET
router.get('/',(req,res)=>{
   Projects.get()
   .then(projects=>{
       res.status(200).json(projects)
   })
})
//GET with ID
router.get('/:id', async (req,res)=>{
    const{id}=req.params
    try{
        const project= await Projects.get(id)
        if(!project){
            res.status(404).json({message:"This is not an ID"})
        }else{
            res.json(project)
        }
    }catch{
        res.status(500).json({message:"ERROR NOOOO!!!"})
    }    
})
//POST
router.post('/',async(req,res)=>{
    const {name,description} = req.body
    try{
    if(!name || !description){
        res.status(400).json({message:'please provide name and description for the project'})
    }else{
        const project = await Projects.insert(req.body)
        res.status(200).json(project)
    }
    }catch(err){
        res.status(500).json({message:"no server"})
    }
})
//PUT ID -No clue why this is failing 
router.put('/:id',async (req,res)=>{
    const{id}=req.params
    const {name,description,completed} = req.body
    try{
        const project= await Projects.get(id)
        if(!name || !description || !completed){
            res.status(400).json({message:'please provide name,description and if its completed for the project'})
        }else{
            if(!project){
                res.status(404).json({message:"could not find that ID "})
            }else{
                const updatedProject = await Projects.update(id,req.body)
                res.json(updatedProject)
            }
        }

    }catch(err){
        res.status(500).json({message:"Mean Error"})
    }
})

//DELETE id
router.delete('/:id', async (req,res)=>{
    const {id} = req.params
    const project= await Projects.get(id)
    try{
        if(!project){
            res.status(404).json({message:"could not find that ID "})
        }else{
            await Projects.remove(req.params.id)
            res.json()
        }
    }catch(err){
        res.status(500).json({message:"Mean Error"})
    }
})
router.get("/:id/actions",async(req,res)=>{
    const {id}=req.params
    try{
        const project = await Projects.get(id)
        if(!project){
            res.status(404).json({message:"could not find that ID "})
        }else{
            const actions = await Projects.getProjectActions(id)
            res.json(actions)
        }
    }catch(err){
        res.status(500).json({message:"Mean Error"})
    }

})

module.exports = router