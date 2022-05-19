import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

export default (instrumentationKey) => {
    var reactPlugin = new ReactPlugin();
    var appInsights = new ApplicationInsights({
        config: {
            instrumentationKey: instrumentationKey,
            enableAutoRouteTracking: true,
            extensions: [reactPlugin]
        }
    });
    appInsights.loadAppInsights();
}