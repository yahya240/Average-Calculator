const Student = require("../../models/Student")
const {validationResult} = require('express-validator')

const index = async (req, res) => {
    const students = await Student.findAll()
    if (!students) {
        return res.status(404).json({ msg: 'student were not found!' })
    }
    res.status(200).json({ msg: 'student found successfuly.', students })
}

const store = async (req, res) => {
    const result = validationResult(req)
    if(result.isEmpty()){
        const student = await Student.create(req.body)
        if (!student) {
            res.status(404).json({ msg: 'user was not created.' })
        }
        res.status(201).json({ msg: 'student created successfuly.', student })
    }else{
        let errors = result.array()
        res.status(400).json({ msg: 'something went wrong!',errors })
    }
}

const update = async(req, res) => {
    const result = validationResult(req)
    if(result.isEmpty()){
        const updatedUser = await Student.update(req.body,{where:{id:req.params.id}})
        if(updatedUser[0] === 0){
            return res.status(404).json({msg:'Student updating failed!'})
        }
        res.status(200).json({msg:'Student updated successfuly.',updatedUser})
    }else{
        let errors = result.array()
        res.status(400).json({ msg: 'something went wrong!',errors })
    }    
}

const destroy = async(req, res) => {
    const result = validationResult(req)
    if(result.isEmpty()){
        const deletedStudent = await Student.destroy({ where: { id: req.params.id } })
        res.status(200).json({ msg: 'student deleted successfuly.', deletedStudent })
    }else{
        res.status(400).json({msg:'something went worng', errors: result.array()})
    }
}


//============ this is old way before ID Params Validation 

// const update = async(req, res) => {
//     const student = await Student.findByPk(req.params.id)
//     if(!student){
//         return res.status(404).json({msg:'Student were not found!'})
//     }
//     const updatedUser = await Student.update(req.body,{where:{id:req.params.id}})
//     if(updatedUser[0] === 0){
//         return res.status(404).json({msg:'Student updating failed!'})
//     }
//     res.status(200).json({msg:'Student updated successfuly.',updatedUser})
// }

// const destroy = async(req, res) => {
//     const deletedStudent = await Student.destroy({ where: { id: req.params.id } })
//     if(!deletedStudent){
//         return res.status(404).json({msg:'Deleting student failed!'})
//     }
//     res.status(200).json({ msg: 'student deleted successfuly.', deletedStudent })
// }

module.exports = {
    index,store,update,destroy
}