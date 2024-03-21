import { useEffect } from 'react';
import { LogType, LogLevel, debugPrefix } from './types';

/** Log listener configuration settings and function callbacks */
export const logConfig = {
    /** If set to true, all logs will also be piped to console.log */
    debug: false,
    maxLogLevel: LogLevel.Information,
    logGeneral: undefined,
    logAuthentication: undefined,
    logException: undefined,
    logPageView: undefined,
    logFetch: undefined,
    logEvent: undefined,
}

/** Log Listener, usually found int he host, which requires config and debug flags.
 * This listener allows you to subscribe to global log events and apply your own log aggregator.
 * @param config: The log configuration flags and callback functions.
 */
export const LogListener = ({ config }) => {

    /** Handle the event and append any extra config based logic */
    const handleEvent = (event, type, func) => {
        if (config.debug) { console.log(debugPrefix, type, event.detail); }
        func(event);
    }
    
    /** On mount register and unregister event listeners if the config function is */
    useEffect(() => {
        config.logGeneral && window.addEventListener(LogType.General, (event) => { handleEvent(event, LogType.General, config.logGeneral) });
        config.logAuthentication && window.addEventListener(LogType.Authentication, (event) => { handleEvent(event, LogType.Authentication. config.logAuthentication) });
        config.logException && window.addEventListener(LogType.Exception, (event) => { handleEvent(event, LogType.Exception, config.logException) });
        config.logPageView && window.addEventListener(LogType.PageView, (event) => { handleEvent(event, LogType.PageView, config.logPageView) });
        config.logFetch && window.addEventListener(LogType.Fetch, (event) => { handleEvent(event, LogType.Fetch, config.logFetch) });
        config.logEvent && window.addEventListener(LogType.Event, (event) => { handleEvent(event, LogType.Event, config.logEvent) });
        return () => {
            config.logEvent && window.removeEventListener(LogType.General, config.logEvent);
            config.logAuthentication && window.removeEventListener(LogType.Authentication, config.logAuthentication);
            config.logException && window.removeEventListener(LogType.Exception, config.logException);
            config.logPageView && window.removeEventListener(LogType.PageView, config.logPageView);
            config.logFetch && window.removeEventListener(LogType.Fetch, config.logFetch);
            config.logEvent && window.removeEventListener(LogType.Event, config.logEvent);
        };
    }, []);

    /** Return nothing, in case we are using this in JSX */
    return null;
}

export default {
    LogListener,
    logConfig
};