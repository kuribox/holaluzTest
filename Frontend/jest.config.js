module.exports = {
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        '^.+\\.vue$': '@vue/vue3-jest',
    },
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        customExportConditions: ["node", "node-addons"],
    },
    testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    setupFilesAfterEnv: ['./jest.setup.js'],
};