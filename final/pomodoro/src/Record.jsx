import { useState } from "react"

function Record({count}) {
  return (
    <div>
      <h2>Record</h2>
      You have completed {count} cycles
    </div>
  )
}

export default Record