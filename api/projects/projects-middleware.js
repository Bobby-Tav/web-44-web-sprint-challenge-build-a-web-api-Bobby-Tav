// add middlewares here related to projects
const Projects = require('./projects-model')
async function validateProjectId(req, res, next) {
    try{
        const project= await Projects.get(req.params.id)
        if(!project){
            res.status(404).json({message:"This is not an ID"})
        }else{
        req.project = project
        next()
      }
    } catch(err){
      res.status(500).json({message:'problem finding user'})
    }
  }

  async function validateName(req, res, next) {
    const {name} = req.body
    if(!name) {
      res.status(400).json({ message: "missing required name or description field" })
    }else{
      req.name = name
      next()
    }
  }
  async function validateDescript(req, res, next) {
    const {description} = req.body
    if(!description) {
      res.status(400).json({ message: "missing required name or description field" })
    }else{
      req.description = description
      next()
    }
  }
  async function validateCompleted(req, res, next) {
    const {completed} = req.body
    if(!completed) {
      res.status(400).json({ message: "missing required name or description field" })
    }else{
      req.completed = completed
      next()
    }
  }

  module.exports = {
    validateProjectId,
    validateName,
    validateDescript,
    validateCompleted
  }