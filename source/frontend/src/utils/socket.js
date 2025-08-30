import { socketDataTypes } from "../constants/socketDataTypes";

const baseUrl = process.env.REACT_APP_SOCKET_URL || "ws://localhost:8000/execute";

export function createSocket(
    code,
    handleOnMessage,
    handleOnInput,
    handleOnComplete,
    handleOnError,
    setHasError
) {
    const sock = new WebSocket(`${baseUrl.replace('http', 'ws')}execute`);

    sock.onopen = () => {
        sock.send(JSON.stringify({ code }));
    };

    sock.onmessage = ({ data }) => {
        setHasError(false);
        const socketData = JSON.parse(data);
        if (socketData.type === socketDataTypes.INPUT_PROMPT) {
            handleOnInput(true)
        } else if (socketData.type === socketDataTypes.OUTPUT) {
            handleOnMessage(socketData.content);
        } else if ([socketDataTypes.ERROR, socketDataTypes.STDERR].includes(socketData.type)) {
            handleOnError(socketData.message);
        } else if (socketData.type === socketDataTypes.EXECUTED) {
            handleOnComplete();
            sock.close();
        }
    };

    return sock;
}
