import { useEffect, useState } from "react"
import { useContext } from "react";
import AppContext from "./AppContext";
import { fetchRecord } from "./services";
import { ACTIONS } from "./constants";

function Record() {
  const {state, dispatch} = useContext(AppContext)

  useEffect(() => {
    fetchRecord()
    .then(({recordState}) => {
      dispatch({type: ACTIONS.SET_RECORD, recordState})
    })
    .catch(err => console.log(err))
  },[])

  return (
    <div>
      <h2>Record</h2>
      You have completed {state.recordState.count} cycles
    </div>
  )
}

export default Record