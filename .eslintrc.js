module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"], // ["plugin:react", "standard"]
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        semi: [2, "always"],
        indent: [0, 4], // indent: ["error", 4, { SwitchCase: 1 }],
        "comma-dangle": ["error", "never"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        "multiline-ternary": ["error", "never"],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "no-unused-vars": "off"
        // "array-callback-return": ["error", { allowImplicit: true }]
    }
};
