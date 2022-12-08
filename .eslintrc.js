module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: "xo",
    overrides: [
        {
            extends: ["xo-typescript"],
            files: ["*.ts", "*.tsx"],
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "@typescript-eslint/indent": "off",
        "comma-dangle": "off",
        "space-before-function-paren": "off",
        quotes: ["error", "double"],
        "no-warning-comments": "off",
    },
};
