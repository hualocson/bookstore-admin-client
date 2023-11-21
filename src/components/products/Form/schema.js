import { date, number, object, string } from "yup";

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
  author: string().required("author is Required."),
  pages: number("Invalid number format")
    .positive("pages must be a positive number.")
    .required("pages is required."),
  publisher: string().required("publisher is Required."),
  publicationDate: date().required("publicationDate is Required."),
  status: number()
    .positive("Status must be a positive number.")
    .required("Status is required."),
}).required();
export default schema;
