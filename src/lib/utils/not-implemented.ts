/**
 * @see https://en.wikipedia.org/wiki/Hal_9000
 * @param action
 */
export const notImplementedHalMsg =
    (action = "do that") =>
        () =>
            alert(`I'm sorry Dave. I'm afraid you can't ${action}.`);