export type ConnectorDirection = "x" | 'y' | '+x' | '-x' | '-y' | '+y';

export const drawConnector = (connectorDirection: ConnectorDirection) => {
  return (
    <path
      d="M10 3 C30 3 20 30 40 30"
      fill="none"
      stroke="black"
      strokeWidth="3"
    />
  );
}
