import joi from "joi";

const signupSchema = joi.object({
    fname: joi.string().min(4).max(20).required().messages({
        "string.empty": "First name cannot be empty",
        "string.min": "First name should be at least 4 characters long",
        "string.max": "First name cannot exceed 20 characters length",
        "any.required": "First name is missing.",
    }),
    lname: joi.string().min(4).max(20).required().messages({
        "string.empty": "Last name cannot be empty",
        "string.min": "Last name should be at least 4 characters long",
        "string.max": "Last name cannot exceed 20 characters length",
        "any.required": "Last name is missing",
    }),
    username: joi.string().min(5).max(50).required().messages({
        "string.empty": "Username cannot be empty",
        "string.min": "Username should be at least 5 characters long",
        "string.max": "Username should not exceed 50 characters length",
        "any.required": "Username is missing",
    }),
    password: joi.string().min(8).required().messages({
        "string.empty": "Password cannot be empty",
        "string.min": "Password should be at least 8 characters long",
        "any.required": "Password is missing",
    }),
    confirmPassword: joi.valid(joi.ref("password")).messages({
        "any.only": "Passwords do not match",
    }),
});

const loginSchema = joi.object({
    username: joi.string().required().messages({
        "string.base": "Username should be a string",
        "any.required": "Username is missing",
    }),
    password: joi.string().required().messages({
        "string.base": "Password should be a string",
        "any.required": "Password is missing",
    }),
});
export { signupSchema, loginSchema };
