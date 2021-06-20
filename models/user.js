const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

// 사용자 Collection에 대한 스키마 정의 (몽고디비는 명시적인 구조가 없기 때문에 어떤 필드가 어떤 데이터 타입인지 알기 어려운 단점이 있습니다. 이 문제를 보완하기 위해 Mongoose는 스키마를 사용합니다)
const userSchema = new mongoose.Schema({
    service_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    birth: {
        type: Date,
    },
    delivery_password: {
        type: String,
    }
},
    {
        timestamps: true
    }
);

// Create Model & Export
module.exports = mongoose.model('User', userSchema);