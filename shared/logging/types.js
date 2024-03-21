/** Console log prefix for event messages */
export const debugPrefix = `[MFE-LOGGER]`;

/** The log levels  */
export const LogLevel = {
    Information: 0,
    Warning: 1,
    Error: 2
}

/** Log type flag which is decorated in the event */
export const LogType = {
    General: 'GENERAL',
    Authentication: 'AUTHENTICATION',
    Exception: 'EXCEPTION',
    PageView: 'PAGE_VIEW',
    Fetch: 'FETCH',
    Event: 'EVENT'
}

export default {
    LogLevel,
    LogType,
    debugPrefix
};