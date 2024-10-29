import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import CadastrarInscricao from './inscricao/cadastrarInscricao'
import CadastrarUsuario from './usuario/cadastrarUsuario';
import { Button, Typography } from '@mui/material'

function App() {

  return (
    <>

      <Typography variant='h3' component='h1' gutterBottom>
        Sistema de Inscrição em Eventos
      </Typography>

      <div>
        <Link to='/cadastrarUsuario'><Button variant='contained'>Cadastrar Banda</Button></Link>
        <Link to='/cadastrarInscricao'><Button variant='contained'>Cadastrar Inscrição</Button></Link>
      </div>

      <Routes>
        <Route path='/cadastrarUsuario' element={<CadastrarUsuario />}></Route>
        <Route path='/cadastrarInscricao' element={<CadastrarInscricao />}></Route>
      </Routes>

    </>
  )
}

export default App
