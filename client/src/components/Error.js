import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./common.css"

const Error = ({ children }) => {
    return (
        <div class="alert alert-danger" id="container" role="alert">
            {children}
        </div>
    )
}

export default Error