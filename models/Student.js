const db = require('../config/db')
const {DataTypes} = require('sequelize')

const Student = db.define('student',{
    id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(150),
        require:true,
        allowNull: false,
        validate:{
            notNull:{msg:'student name must not be null'}
        }
    },
    number:{
        type: DataTypes.INTEGER,
        require:true,
        allowNull: false,
        unique: true,
        validate:{
            notNull:{msg:'student number must not be null'}
        }
    },
    activities:{
        type: DataTypes.INTEGER,
        require:true,
        defaultValue: 0,
        validate:{
            len: {msg:'activities mark must be between 0 and 20',args:[0,20]}
        }
    },
    mid:{
        type: DataTypes.INTEGER,
        require:true,
        defaultValue: 0,
        validate:{
            len: {msg:'mid mark must be between 0 and 20',args:[0,30]}
        }
    },
    final:{
        type: DataTypes.INTEGER,
        require:true,
        defaultValue: 0,
        validate:{
            len: {msg:'final mark must be between 0 and 20',args:[0,50]}
        }
    },
    total:{
        type: DataTypes.VIRTUAL,
        require:true,
        defaultValue: 0,
        get(){
            return this.get('activities')+this.get('mid')+this.get('final')
        }
    }
},{
    paranoid: true
})

module.exports = Student