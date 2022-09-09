export default {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
    "globals": {
      "Handlebars": false
    }
}

// {
//     "env": {
//         "browser": true,
//         "es6": true
//     },
//     "extends": "eslint:recommended",
//     "parserOptions": {
//         "ecmaVersion": 2015
//     },
//     "rules": {
//         "indent": [
//             "error",
//             2
//         ],
//         "linebreak-style": [
//             "off"
//         ],
//         "quotes": [
//             "error",
//             "single",
//             {"allowTemplateLiterals": true}
//         ],
//         "semi": [
//             "error",
//             "always"
//         ],
//         "no-console": [
//             "off"
//         ]
//     }
// }
