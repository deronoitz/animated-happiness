import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    "<rootDir>/src/components/**/*.{js,jsx,ts,tsx}",
    "!<rootDir>/src/components/**/validation.{js,jsx,ts,tsx}",
    "!<rootDir>/src/components/**/types.{js,jsx,ts,tsx}",
    "!<rootDir>/src/components/**/*.test.{js,jsx,ts,tsx}",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov"],
};

export default createJestConfig(config);
