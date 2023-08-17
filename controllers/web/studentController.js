const Student = require('../../models/Student')
const {validationResult} = require('express-validator')

const index = async (req, res) => {
    const students = await Student.findAll()
    res.render('index', { students })
}

const store = async (req, res) => {
    const result = validationResult(req)
    if(result.isEmpty()){
        const student = await Student.create(req.body)
        if (!student) {
            return res.with('errors',[{msg:'user was not created.'}]).with('old',req.body).redirect('/')
        }
        res.redirect('/')
    }else{
        console.log(result.array());
        res.with('errors',result.array()).with('old',req.body).redirect('/')
    }
    
}

const destroy = async (req, res) => {
    const deletedStudent = await Student.destroy({ where: { id: req.params.id } })
    if(!deletedStudent){
        return res.with('errors',[{msg:'Deleting student failed.'}]).redirect('/')
    }
    res.redirect('/')
}

module.exports = {
    index, store, destroy
}