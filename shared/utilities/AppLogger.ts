

const AppLogger = {
    logException(error: Error) {
        const stack = error.stack;
        const customEvent = new CustomEvent('exception', { detail: { stack } });
        window.dispatchEvent(customEvent);
    }
}

export default AppLogger