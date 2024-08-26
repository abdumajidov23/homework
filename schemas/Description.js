const {Schema,model} = require('mongoose')

const descriptionSchema = new Schema({
  category_id: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000,
  }

},
  {
    versionKey: false,
  })

module.exports = model("Description",descriptionSchema)