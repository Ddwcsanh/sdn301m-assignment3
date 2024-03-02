import { Document, Schema, model } from 'mongoose'

export interface ICategory extends Document {
  name: string
}

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      index: {
        unique: true
      }
    }
  },
  {
    timestamps: true,
    collection: 'categories',
    toJSON: {
      transform(doc, ret) {
        delete ret.__v
      }
    }
  }
)

const Category = model<ICategory>('Categories', CategorySchema)

export default Category
