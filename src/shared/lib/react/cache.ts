import * as React from 'react';

type CacheFn = <Args extends unknown[], Result>(
	fn: (...args: Args) => Result
) => (...args: Args) => Result;

const identityCache: CacheFn = (fn) => fn;
const reactModule = React as unknown as Record<string, unknown>;
const maybeCache = reactModule['cache'];

export const reactCache: CacheFn =
	typeof maybeCache === 'function' ? (maybeCache as CacheFn) : identityCache;
