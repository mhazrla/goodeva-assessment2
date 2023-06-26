const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "node_modules/preline/dist/*.js",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "Montserrat",
                    "Lato",
                    "Garamond",
                    "Poppins",
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            colors: {
                primary: "#FBFDFF",
                "dark-blue": "#5DA7DB",
                "light-blue": "#81C6E8",
                fontPrimary: "#494949",
            },
        },
    },

    plugins: [
        require("@tailwindcss/forms"),
        require("daisyui"),
        require("preline/plugin"),
    ],
};
