// Write your "projects" router here!
const express = require('express');
const {validateProjectId,validateName,validateDescript,validateCompleted,validateProject} = require('./projects-middleware')
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
router.get('/:id', validateProjectId,async (req,res,next)=>{
    try{
        res.json(req.project)
    }catch(err){
        next(err)
    }    
})
//POST
router.post('/' ,validateProject, async(req,res,next)=>{
    try{
        const project = await Projects.insert({name:req.name,description:req.description,completed:req.completed})
        res.status(200).json(project)
    }catch(err){
        next(err)
    }
})
//PUT ID -No clue why this is failing 
router.put('/:id',validateProjectId,validateProject ,async (req,res,next)=>{
    const{id}=req.params
    try{
         await Projects.update(id,{name:req.name,description:req.description, completed:req.completed})
        const updatedProject = await Projects.get(id)    
        res.json(updatedProject)
            
    }catch(err){
        next(err)
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
router.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
      Message:"something went wrong",

    })
  })

module.exports = router