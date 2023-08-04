import '@testing-library/jest-dom';
import {server} from './Mocks/Server.ts';
import ResizeObserver from "resize-observer-polyfill";

// this stops Uncaught [ReferenceError: ResizeObserver is not defined]
// when running tests
global.ResizeObserver = ResizeObserver;

// Establish API mocking before all tests.

beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,

// so they don't affect other tests.

afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.

afterAll(() => server.close());
