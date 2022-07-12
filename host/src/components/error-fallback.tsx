interface Props {
    resetErrorBoundary: () => void;
}
export default ({ resetErrorBoundary }: Props) => {
    return (
        <div>
            Error from ErrorFallback - host
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
};
