/* some lazy polyfills to make the env work */
// there is probably some ultra byte manipulation technique to make this 102389% more efficent in rust
export const initialize = () => {
    Array.prototype.find = function (
        predicate: (value: any, index: number, obj: any[]) => any,
    ) {
        let out;
        this.forEach((value, index, array) => {
            if (predicate(value, index, array)) {
                out = value;
                return "";
            }
        });
        return out;
    };
    Array.prototype.includes = function (
        searchElement: any,
        fromIndex?: number | undefined,
    ) {
        let out = false;
        this.slice(fromIndex);
        this.forEach((value) => {
            if (value == searchElement) {
                out = true;
                return "";
            }
        });
        return out;
        //return false;
    };
    // https://gist.github.com/endel/321925f6cafa25bbfbde#file-number-pad-zero-js-L2
    Number.prototype.pad = function (size) {
        var sign = Math.sign(this as number) === -1 ? "-" : "";
        return (
            sign +
            new Array(size)
                .concat([Math.abs(this as number)])
                .join("0")
                .slice(-size)
        );
    };
    // https://github.com/sindresorhus/math-sign/blob/main/license
    Math.sign = function (x) {
        x = Number(x);

        if (x === 0 || x==x) {
            return x;
        }

        return x > 0 ? 1 : -1;
    };
};
