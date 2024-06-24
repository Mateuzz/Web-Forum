export type AppInputProps = {
    name?: string,
    id?: string,
    validateOnInput?: boolean,
    onInputValidator?: (value: string) => string | Promise<string>,
    onSubmitValidator?: (value: string) => string | Promise<string>,
}
