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
        screens: {
            'xs': {'max': '375px'},
            ...defaultTheme.screens,
        },
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
            width: {
                "10v": "10vw",
                "20v": "20vw",
                "30v": "30vw",
                "40v": "40vw",
                "50v": "50vw",
                "60v": "60vw",
                "70v": "70vw",
                "80v": "80vw",
                "90v": "90vw",
                "100v": "100vw",
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
                lotion: "#FAFAFA",
                cultured: "#F5F5F5",
                ceruleanBlue: "#414FC7",
                cornsilk:"#FFF7DC",
                nyanza: "#E3FFE7",
                deepMossGreen: '#2E643A',
                blackCoral: '#5B5B66',
                quickSilver: '#A5A3A3',
                floralWhite: '#FFFCEF',
                header: "rgba(251, 234, 200, 0.35)",
                tabs: "rgba(65, 84, 114, 0.75)",
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
