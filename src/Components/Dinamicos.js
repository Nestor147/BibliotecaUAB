import React from 'react'
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import Usuario from './Usuario'

export default function Dinamicos() {
  let user = [
    {name:"Jhon", id:1},
    {name:"Jose", id:2},
    {name:"Jilberto", id:3},
    {name:"Jhasmani", id:4},
  ]
  
    return (
    <div>Dinamicos
        <Router>
            <h1>lista</h1>
            {
            user.map((item)=>
            <div><Link to={'/user/'+item.id}>{item.name}</Link></div>
            )
            }
            <Routes>
                <Route path='/user/:id' element={<Usuario/>}></Route>
            </Routes>
        </Router>
    </div>
  )
}
