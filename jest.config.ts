import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths)
};

export default config;
