export const notImplementedHalMsg =
    (action = "do that") =>
        () =>
            alert(`I'm sorry Dave. I'm afraid you can't ${action}.`);