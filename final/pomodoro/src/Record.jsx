import { useState } from "react"
import { useContext } from "react";
import AppContext from "./AppContext";

function Record() {
  const {state, dispatch} = useContext(AppContext)

  return (
    <div>
      <h2>Record</h2>
      You have completed {state.count} cycles
    </div>
  )
}

export default Record