export function tryFn<T>(fn: () => T): [null, T];
export function tryFn<T>(fn: () => T): [any, null];
export function tryFn<T>(fn: () => T): [null, T] | [any, null] {
    try {
        return [null, fn()]
    } catch (err: any) {
        return [err, null]
    }
}
