const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './app/views/**/*.html.erb',
        './app/helpers/**/*.rb',
        './app/assets/stylesheets/**/*.css',
        './app/javascript/**/*.js',

        './public/*.html',
        './app/views/**/*.{erb,haml,html,slim}'
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                light: {
                    text: {
                        main: "#717171",
                        secondary: "#A5A3A3"
                    },
                    body: "#FAFAFA",
                    header: "#FBEAC8",
                    btn: "#414FC7",
                    sideNav: "#FAFAFA"
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
