// @ts-nocheck

declare global {
    interface WebpackEvent {
        type: string;
        target: Record<string, unknown>;
    }

    interface WebpackContainerScope {
        __initialized: boolean;
        __initializing: boolean;
        init(scopes: unknown): Promise<Record<string, unknown>>;
    }

    const __webpack_init_sharing__: (parameter: string) => Promise<void>;
    const __webpack_share_scopes__: { default: unknown };
    // eslint-disable-next-line @typescript-eslint/ban-types
    const __webpack_require__: {
        l: (url: string, cb: (event: WebpackEvent) => void, id: string) => Record<string, unknown>;
    };
}

interface ImportRemoteOptions {
    /** The url used for getting remote configuration from an api. */
    configApiUrl: string;
    /** The name of the variable in Azure App Config, a prefix of Remote will be used. */
    remoteName: string;
    /** The webpack remote name being exposed, eg: "faq" */
    scope: string;
    /** The module (component) being exposed, eg: "Application" */
    module: string;
    /** The URL for the remote to use, short circuits Azure App Config */
    remoteUrlFallback?: string | null | undefined;
    bustRemoteEntryCache?: boolean;
}

interface LoadRemoteOptions {
    url: string;
    scope: string;
    bustRemoteEntryCache?: boolean;
}

const loadRemote = ({ url, scope, bustRemoteEntryCache }: LoadRemoteOptions) =>
    new Promise<void>((resolve, reject) => {
        const timestamp = bustRemoteEntryCache ? `?t=${new Date().getTime()}` : '';
        __webpack_require__.l(
            `${url}${timestamp}`,
            event => {
                if (event?.type === 'load') {
                    // Script loaded successfully:
                    return resolve();
                }
                const realSrc = event?.target?.src;
                const error = new Error();
                error.message = 'Loading script failed.\n(missing: ' + realSrc + ')';
                error.name = 'ScriptExternalLoadError';
                reject(error);
            },
            scope
        );
    });

const initSharing = async () => {
    if (!__webpack_share_scopes__?.default) {
        await __webpack_init_sharing__('default');
    }
};

const initContainer = async (containerScope: WebpackContainerScope) => {
    try {
        if (!containerScope.__initialized && !containerScope.__initializing) {
            containerScope.__initializing = true;
            await containerScope.init(__webpack_share_scopes__.default);
            containerScope.__initialized = true;
            delete containerScope.__initializing;
        }
    } catch (error) {
        // If the container throws an error, it is probably because it is not a container.
        // In that case, we can just ignore it.
    }
};

/*
    Fetches the remote url from Azure App Configuration
*/
const fetchRemoteConfiguration = async (baseUrl: string, remoteName: string) => {
    try {
        if (!baseUrl.endsWith('/')) {
            baseUrl = baseUrl + '/';
        }
        const response = await fetch(`${baseUrl}${remoteName}`);
        const result = response.json();
        return result;
    } catch (error) {
        console.log({ error });
        throw error;
    }
};

const fetchRemoteFallback = async (url: string) => {
    try {
        const response = await fetch(url);
        const result = response.json();
        return result;
    } catch (error) {
        console.log({ error });
        throw error;
    }
};

/*
    Dynamically import a remote module using Webpack's loading mechanism:
    https://webpack.js.org/concepts/module-federation/
  */
const importRemote = async <T>({
    configApiUrl,
    remoteName,
    scope,
    module,
    remoteUrlFallback,
    bustRemoteEntryCache = false,
}: ImportRemoteOptions): Promise<T> => {
    if (!window[scope]) {
        const remoteDetails = remoteUrlFallback
            ? { value: remoteUrlFallback }
            : await fetchRemoteConfiguration(configApiUrl, remoteName);

        // Load the remote and initialize the share scope if it's empty
        await Promise.all([
            loadRemote({
                url: remoteDetails.value,
                scope,
                bustRemoteEntryCache,
            }),
            initSharing(),
        ]);
        if (!window[scope]) {
            const error = new Error(
                `Remote loaded successfully but ${scope} could not be found! Verify that the name is correct in the Webpack configuration!`
            );

            console.log({ error });
            throw error;
        }
        // Initialize the container to get shared modules and get the module factory:
        const [, moduleFactory] = await Promise.all([
            initContainer(window[scope]),
            window[scope].get(module.startsWith('./') ? module : `./${module}`),
        ]);
        return moduleFactory();
    } else {
        const moduleFactory = await window[scope].get(
            module.startsWith('./') ? module : `./${module}`
        );
        return moduleFactory();
    }
};

export default importRemote;
