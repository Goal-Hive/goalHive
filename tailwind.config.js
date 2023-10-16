const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    darkMode: 'class',
    mode: 'jit',
    content: [
        './app/helpers/**/*.rb',
        './app/assets/stylesheets/**/*.css',
        './app/javascript/**/*.js',
        './public/*.html',
        './app/views/**/*.{erb,haml,html,slim}',
        './app/components/**/*.{erb,html}',
        // "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Satoshi','Inter var', ...defaultTheme.fontFamily.sans],
            },
            height: {
                "10v": "10vh",
                "20v": "20vh",
                "30v": "30vh",
                "40v": "40vh",
                "50v": "50vh",
                "60v": "60vh",
                "70v": "70vh",
                "80v": "80vh",
                "90v": "90vh",
                "100v": "100vh",
            },
            colors: {
                fiord :"#415472",
                wildSand: "#F5F5F5",
                doveGray: "#717171",
                zircon: "#F4F6FF",
                yankeesBlue: "#152E40",
                philippineYellow: "#FFC700",
                peach: "#FFEDAC",
                onyx: "#36373D",
                independence: "#415472",
                light: {
                    text: {
                        title: "#415472",
                        main: "#717171",
                        secondary: "#A5A3A3",
                        categories: "#415472",
                        details: {
                            tabs: "rgba(65, 84, 114, 0.75)",
                            selectedTab: "#415472"
                        },
                        darkPurple: "#415472",
                        darkGray: "#152E40",
                        lightGray: "#5B5B66",
                        lightPurple: "#414FC7"
                    },
                    body: "#FAFAFA",
                    header: "rgba(251, 234, 200, 0.7)",
                    sideNav: "#FAFAFA",
                    bg: {
                        lightYellow: "#FFFCEF",
                        darkPurple: "#414FC7",
                        secondary: "#F4F6FF",
                        lightGray: "#F5F5F5",
                        achieved: "#FFF7DC",
                        darkYellow: "#FFC700"
                    }
                },
                dark: {
                    header: "#2E2F34",
                    navbar: "#36373D",
                    navbarInsider: "#464653",
                    body: "#3E3F45",
                    goalCard: "#393A41",
                    goalCardMilestones: "#464653",
                    updateProgressText:"#A5A3A3",
                    updateProgress:"#494747",
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries'),
        // require('flowbite/plugin')
    ]
}
