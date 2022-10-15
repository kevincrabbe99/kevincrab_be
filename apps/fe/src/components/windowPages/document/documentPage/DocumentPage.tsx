import React from 'react'
import "./documentPage.scss"

export default function DocumentPage() {
  return (
    <div className="docPage-wrapper">
      <div className="docPage-top">
        <ul>
          <li>File</li>
          <li>Edit</li>
          <li>Search</li>
          <li>Help</li>
        </ul>
      </div>
      <div className="docPage-content">
        <div className="docPage-doc-wrapper">
          <iframe src="./documents/Kevin_Crabbe_Resume.pdf#toolbar=0"></iframe>
        </div>
      </div>
    </div>
  )
}
