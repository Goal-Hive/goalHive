const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    mode: 'jit',
    content: [
        './app/helpers/**/*.rb',
        './app/assets/stylesheets/**/*.css',
        './app/javascript/**/*.js',
        './public/*.html',
        './app/views/**/*.{erb,haml,html,slim}',
        './app/components/**/*.{erb,html}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
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
                        lightGray: "#5B5B66"
                    },
                    body: "#FAFAFA",
                    header: "rgba(251, 234, 200, 0.7)",
                    btn: "#414FC7",
                    sideNav: "#FAFAFA",
                    bg: {
                        darkpPurple: "#414FC7",
                        secondary: "#F4F6FF",
                        lightGray: "#F5F5F5",
                        achieved: "#FFF7DC",
                        darkPurple:"#414FC7",
                        darkYellow: "#FFC700"
                    }
                },
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries'),
    ]
}
