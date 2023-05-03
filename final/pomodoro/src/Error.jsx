import { MESSAGES } from "./constants";
import { useContext } from "react";
import AppContext from "./AppContext";

function Error() {
  const {state, dispatch} = useContext(AppContext)

	const message = MESSAGES[state.error] || MESSAGES.default;
	return <>{!!state.error && <p className="alert">{message}</p>}</>;
}

export default Error;
