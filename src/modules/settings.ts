import config from "../config";

export let settings = {
    developerMode: config.developerMode || false,
    betaFeatures: false,
} as {
    developerMode: boolean,
    betaFeatures: boolean,
    [settingName: string]: any,
};
export let setSetting = (setting: string, value: any) =>
    (settings[setting] = value);
