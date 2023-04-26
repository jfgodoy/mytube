export function tryFn<T>(fn: () => T): [null, T];
export function tryFn<T>(fn: () => T): [any, null];
export function tryFn<T>(fn: () => T): [null, T] | [any, null] {
    try {
        return [null, fn()]
    } catch (err: any) {
        return [err, null]
    }
}

export async function tryAsyncFn<T>(fn: () => Promise<T>): Promise<[null, T]>;
export async function tryAsyncFn<T>(fn: () => Promise<T>): Promise<[any, null]>;
export async function tryAsyncFn<T>(fn: () => Promise<T>): Promise<[null, T] | [any, null]> {
    try {
        return [null, await fn()]
    } catch (err: any) {
        return [err, null]
    }
}
