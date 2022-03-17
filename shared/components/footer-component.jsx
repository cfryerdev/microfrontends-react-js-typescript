export default ({ year, name, version, userName}) => {
  return (
    <div className="text-center text-muted p-4">
      <div>Copyright {year} - {name} - v{version}</div>
      <div>{userName || 'Not logged in.'}</div>
    </div>
  );
};
  