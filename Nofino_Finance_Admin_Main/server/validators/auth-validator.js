    const {
        z
    } = require("zod");


    //login validation schema
    const loginSchema = z.object({
        email: z
        .string({required_error: "email is require"})
        .trim()
        .email({ message: "Invalid email address."})
        .min(3, {message: "Name must be at lest of 3chats."})
        .max(255, {message: "Name must be at lest of 255 chats."}),

        password: z
        .string({required_error: "password is require"})
        .min(8, {message: "password must be at lest of 8 chats."})
        .max(1024, {message: "password must be at lest of 1024 chats."})
        
    });

    // creating anobject Schema
    const signupSchema = loginSchema.extend({
        username: z
        .string({required_error: "Name is require"})
        .trim()
        .min(3, {message: "Name must be at lest of 3chats."})
        .max(255, {message: "Name must be at lest of 255 chats."}),

        phone: z
        .string({required_error: "phone is require"})
        .trim()
        .min(10, {message: "phone must be at lest of 10chats."})
        .max(20, {message: "phone must be at lest of 20 chats."})

    });

    module.exports = {
        signupSchema,
        loginSchema
    };