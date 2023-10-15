import { number, object, string } from "yup";

const schema = object({
  name: string().required("Name is Required."),
  image: string()
    .url("Invalid Image URL format.")
    .required("Image URL is required."),
  price: number("Invalid number format")
    .positive("Price must be a positive number.")
    .required("Price is required."),
  quantity: number("Invalid number format")
    .positive("Quantity must be a positive number.")
    .required("Quantity is required."),
  categoryId: number()
    .positive("Category must be a positive number.")
    .required("Category is required."),
  description: string().optional(),
}).required();
export default schema;
