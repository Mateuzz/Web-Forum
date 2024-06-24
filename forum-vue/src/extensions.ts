declare global {
    interface Number {
        padZero: (n: number) => string
    }
}

Number.prototype.padZero = function (n: number) {
    return this.toString().padStart(n, '0')
}
