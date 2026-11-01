const f = Math.floor;

export const secondsToPrettyString = (seconds: number) => {
    return `${seconds > 59 ? (f(seconds / 60) % 60).pad(2) : "00"}:${(seconds % 60).pad(2)}`;
};
