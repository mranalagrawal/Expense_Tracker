import React from 'react'

export const Loader = () => {
  return (
   <div className="d-flex justify-content-center">
  <div className="spinner-grow text-danger" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

  )
}
