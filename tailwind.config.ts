//@ts-nocheck
import type {Config} from "tailwindcss";

function customColors(cssVar) {
    return ({opacityVariable, opacityValue}) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${cssVar}), ${opacityValue})`;
        }
        if (opacityVariable !== undefined) {
            return `rgba(var(${cssVar}), var(${opacityVariable}, 1))`;
        }
        return `rgb(var(${cssVar}))`;
    };
}

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",

    ],
    darkMode: "class",

    theme: {
        extend: {
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    xl: "40px",
                    "2xl": "128px",
                },
            },
            colors: {
                primary: {
                    50: customColors("--c-primary-50"),
                    100: customColors("--c-primary-100"),
                    200: customColors("--c-primary-200"),
                    300: customColors("--c-primary-300"),
                    400: customColors("--c-primary-400"),
                    500: customColors("--c-primary-500"),
                    6000: customColors("--c-primary-600"),
                    700: customColors("--c-primary-700"),
                    800: customColors("--c-primary-800"),
                    900: customColors("--c-primary-900"),
                },
                secondary: {
                    50: customColors("--c-secondary-50"),
                    100: customColors("--c-secondary-100"),
                    200: customColors("--c-secondary-200"),
                    300: customColors("--c-secondary-300"),
                    400: customColors("--c-secondary-400"),
                    500: customColors("--c-secondary-500"),
                    6000: customColors("--c-secondary-600"),
                    700: customColors("--c-secondary-700"),
                    800: customColors("--c-secondary-800"),
                    900: customColors("--c-secondary-900"),
                },
                neutral: {
                    50: customColors("--c-neutral-50"),
                    100: customColors("--c-neutral-100"),
                    200: customColors("--c-neutral-200"),
                    300: customColors("--c-neutral-300"),
                    400: customColors("--c-neutral-400"),
                    500: customColors("--c-neutral-500"),
                    6000: customColors("--c-neutral-600"),
                    700: customColors("--c-neutral-700"),
                    800: customColors("--c-neutral-800"),
                    900: customColors("--c-neutral-900"),
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("@tailwindcss/aspect-ratio"),
    ],
} satisfies Config;
