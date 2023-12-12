import React from 'react'
import { useParams } from 'react-router-dom';

function Usuario(props) {
    const { id } = useParams();

  return (
    <div>
        <h1>Usuario {id}</h1>
    </div>
  )
}

export default Usuario;