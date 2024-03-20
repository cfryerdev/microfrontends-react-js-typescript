import { LogType } from './types';

const _extendDetail = (detail) => {
    detail.properties
        ? (detail.properties.location = window.location.href)
        : (detail.properties = { location: window.location.href });
    if (detail.properties) {
        Object.keys(detail.properties).forEach(key => {
            if (typeof detail.properties[key] == 'number') {
                detail.properties[key] = detail.properties[key].toString();
            }
        });
    }
    return detail;
}


/** Log client instance which has function calls for logging and setting specific log type events */
export const LogClient = {
    /** Function call forwarder setting custom event type to LogType General */
    logGeneral: (detail) => {
        detail = _extendDetail(detail);
        const customEvent = new CustomEvent(LogType.General, { detail: detail });
        window.dispatchEvent(customEvent);
    },
    /** Function call forwarder setting custom event type to LogType Authentication */
    logAuthentication: (detail) => {
        detail = _extendDetail(detail);
        const customEvent = new CustomEvent(LogType.Authentication, { detail: detail });
        window.dispatchEvent(customEvent);
    },
    /** Function call forwarder setting custom event type to LogType Exception */
    logException: (detail) => {
        detail = _extendDetail(detail);
        const customEvent = new CustomEvent(LogType.Exception, { detail: detail });
        window.dispatchEvent(customEvent);
    },
    /** Function call forwarder setting custom event type to LogType Event */
    logEvent: (detail) => {
        detail = _extendDetail(detail);
        const customEvent = new CustomEvent(LogType.Event, { detail: detail });
        window.dispatchEvent(customEvent);
    },
    /** Function call forwarder setting custom event type to LogType Fetch */
    logFetch: (detail) => {
        detail = _extendDetail(detail);
        const customEvent = new CustomEvent(LogType.Fetch, { detail: detail });
        window.dispatchEvent(customEvent);
    },
    /** Function call forwarder setting custom event type to LogType PageView */
    logPageView: (detail) => {
        detail = _extendDetail(detail);
        const customEvent = new CustomEvent(LogType.PageView, { detail: detail });
        window.dispatchEvent(customEvent);
    },
    /** Function call forwarder setting custom event type to a LogType which you pass through */
    log: (detail, loggerType) => {
        detail = _extendDetail(detail);
        const customEvent = new CustomEvent(loggerType, { detail: detail });
        window.dispatchEvent(customEvent);
    },
};

export default {
    LogClient
};