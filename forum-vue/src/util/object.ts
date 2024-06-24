export function deleteKeys
    <T extends Record<string | symbol | number, any>,
        Keys extends keyof T>
    (object: T, keys: Keys[]) : Omit<T, Keys> 
{
    for (const key of keys)
        if (object[key])
            delete object[key]
    return object
}
