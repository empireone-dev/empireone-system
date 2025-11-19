import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            screens: {
                xxs: "320px", // very small phones
                xs: "480px", // small phones
            },
            keyframes: {
                slideLeftFade: {
                    "0%": { opacity: 0, transform: "translateX(20px)" },
                    "100%": { opacity: 1, transform: "translateX(0)" },
                },
                slideRightFade: {
                    "0%": { opacity: 0, transform: "translateX(-20px)" },
                    "100%": { opacity: 1, transform: "translateX(0)" },
                },
                fadeIn: {
                    "0%": { opacity: 0.4 },
                    "100%": { opacity: 1 },
                },
            },
            animation: {
                slideLeftFade: "slideLeftFade 0.35s ease-out",
                slideRightFade: "slideRightFade 0.35s ease-out",
                fadeIn: "fadeIn 0.3s ease-out",
            },
        },
    },

    plugins: [forms],
};
