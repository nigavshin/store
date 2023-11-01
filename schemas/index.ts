import * as Yup from "yup";

export const validationSchemaRegister = Yup.object().shape({
    name: Yup.string()
        .min(1, "Too much short")
        .required("The field is empty"),
    email: Yup.string().email('Must be a valid email').required("The field is empty"),
    password: Yup.string()
        .min(4, "Too much short")
        .required("The field is empty"),
});

export const validationSchemaLogin = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required("The field is empty"),
    password: Yup.string()
        .min(4, "Too much short")
        .required("The field is empty"),
});
