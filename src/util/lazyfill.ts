/* some lazy polyfills to make the env work */
export const initialize = () => {
    Array.prototype.find = function (predicate: (value: any, index: number, obj: any[]) => any) {
        let out;
        this.forEach((value, index, array) => {
            if (predicate(value, index, array)) {
                out = value;
                return "";
            }
        })
        return out;
    };
    Array.prototype.includes = function (searchElement: any, fromIndex?: number | undefined) {
        let out = false;
        this.slice(fromIndex);
        this.forEach((value) => {
            if (value == searchElement) {
                out = true;
                return "";
            }
        })
        return out;
        //return false;

    };
};