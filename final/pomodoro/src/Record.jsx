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
    <div className="record">
      <h2 className="record-heading">Record</h2>
      <p className="record-message">You have completed {state.recordState.count} cycles</p> 
    </div>
  )
}

export default Record