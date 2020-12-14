const express = require('express')
const student = require('../models/student')
const router = express.Router()
const Student = require('../models/student') 

// all students
router.get('/', async (req,res)=>{
    try{
        const students = await Student.find()
        res.json(students)
    }catch(err){
    res.status(500).json({message: err.message}) //statuscode 500 is an error on server
    }
})

//getting one
router.get('/:id', getStudent, (req, res)=>{
    res.json(res.student)  
})

//creating student
router.post('/', async (req, res)=>{
    
        const student = new Student({
            name: req.body.name,
            scores: req.body.scores,
            grade: req.body.grade
        })
        try{
            const newStudent = await student.save()
            res.status(201).json(newStudent) //201 sucessfully created
        }catch(err){
        res.status(400).json({message: err.message}) //400 wrong with user input
         }
})

//uppdating 
router.patch('/:id', getStudent, async (req, res)=>{
    if(req.body.name!=null){
        res.student.name = req.body.name
    }
    if(req.body.scores!=null){
        res.student.scores = req.body.scores
    }
    if(req.body.grade!=null){
        res.student.grade = req.body.grade
    }

    try{
        const uppdatedStudent = await res.student.save()
        res.json(uppdatedStudent)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//deleting 
router.delete('/:id', getStudent, async (req, res)=>{
    try{
       await  res.student.remove()
       res.json({message: 'Student Deleted'})
    }catch(err){
        res.status(500).json({message: err.message})
    }   
})

//middleware
async function getStudent(req, res, next){
    let student
    try{
        student = await Student.findById(req.params.id)
        if(student == null){
            return res.status(404).json({message: 'Not Found'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})//500 something wrong in server
    }

    res.student = student
    next()
}


module.exports = router