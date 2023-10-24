import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    email: Yup.string().email('must be a valid email'),
    password: Yup.string()
        .min(4, "Too much short")
        .required("The field is empty"),
});
