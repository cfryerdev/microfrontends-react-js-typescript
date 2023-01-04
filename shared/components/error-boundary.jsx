import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        const defaultState = {
            hasError: false,
            error: undefined,
        };
        this.state = defaultState;
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        let additionalProperties = {};
        if (errorInfo?.componentStack) {
            additionalProperties = {
                componentStack: errorInfo.componentStack,
            };
        }
        console.error({ error: error, properties: additionalProperties });
    }

    render() {
        if (this.state.hasError) {
            return React.isValidElement(this.props.fallback) ? (
                this.props.fallback
            ) : (
                <div> Oops, looks like an unhandled exception happened.</div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
