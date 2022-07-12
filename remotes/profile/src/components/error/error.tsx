import { useErrorHandler } from "react-error-boundary";

export default () => {
    const handleError = useErrorHandler();

    const triggerError = () => {
        handleError("error");
    };
    return (
        <>
            <button onClick={triggerError}>Click for Error</button>
        </>
    );
};
