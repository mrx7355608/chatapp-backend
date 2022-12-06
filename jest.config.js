/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.test.ts"],
    verbose: true,
    forceExit: true,
    moduleNameMapper: {
        "^@root(.*)$": "<rootDir>/src/$1",
        "^@config(.*)$": "<rootDir>/src/config/$1",
        "^@middlewares(.*)$": "<rootDir>/src/middlewares/$1",
        "^@utils(.*)$": "<rootDir>/src/utils/$1",
        "^@api(.*)$": "<rootDir>/src/api/$1",
    },
    //   clearMocks: true
};
