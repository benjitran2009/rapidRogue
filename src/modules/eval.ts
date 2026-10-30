// this allows context eval but not inside the modding context

export const contextEval = (code: string) => eval(code);