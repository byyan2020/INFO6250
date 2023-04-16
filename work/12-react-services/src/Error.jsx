import { MESSAGES } from "./constants";

function Error({ error }) {
	const message = MESSAGES[error] || MESSAGES.default;
	return <>{!!error && <p className="alert">{message}</p>}</>;
}

export default Error;
