const { body,param } = require('express-validator')
const Student = require('../models/Student')

const validateStudent = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Student name is required')
        .matches(/^[A-Za-z -]+$/)
        .withMessage('Invalid Student name format, name should be characters only.')
        .isLength({ min: 6, max: 15 })
        .withMessage('Invalid Student name format, name must be between 6 and 15.')
        .escape(),
    body('number')
    .trim()
    .notEmpty()
    .withMessage('Student number is required')
    .custom((value)=>{
         return Student.count({where:{number: value}}).then((count)=>{
            if(count>0){
                return Promise.reject('Student number must be uniqe, there is another student with same number.')
            }
         })
    }),
    body('activities').isFloat({ min: 0, max: 20 }).withMessage('Activities mark should be between 0 and 20'),
    body('mid').isFloat({ min: 0, max: 30 }).withMessage('Mid mark should be between 0 and 30'),
    body('final').isFloat({ min: 0, max: 50 }).withMessage('Final mark should be between 0 and 50'),
]

const validateID = [
    param('id')
    .trim()
    .notEmpty().withMessage("ID params can not be empty")
    .isInt().withMessage('ID params must be an integer')
    .toInt()
    .custom((value)=>{
        return Student.count({where:{id:value}}).then((count)=>{
            if(count === 0){
                return Promise.reject('No student were found!')
            }
        })
    })
]

module.exports = {
    validateStudent,
    validateID
}