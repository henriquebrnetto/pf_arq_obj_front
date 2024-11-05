import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import CadastrarInscricao from './inscricao/cadastrarInscricao'
import CadastrarUsuario from './usuario/cadastrarUsuario'
import ListarUsuario from './usuario/ListarUsuario'
import { Button, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';

function App() {

  return (
    <>
      <div class="header">
        <Typography variant='h3' component='h1' gutterBottom>
          Sistema de Inscrição em Eventos
        </Typography>
        <div class="buttons"><Link to='/'><Button variant='contained'><HomeIcon /></Button></Link></div>
        <div class="buttons"><Link to='/cadastrarUsuario'><Button variant='contained'>Cadastrar Usuário</Button></Link></div>
        <div class="buttons"><Link to='/cadastrarInscricao'><Button variant='contained'>Cadastrar Inscrição</Button></Link></div>
        <div class="buttons"><Link to='/listarUsuario'><Button variant='contained'>Listar Usuário</Button></Link></div>
      </div>

      <Routes>
        <Route path='/cadastrarUsuario' element={<CadastrarUsuario />}></Route>
        <Route path='/cadastrarInscricao' element={<CadastrarInscricao />}></Route>
        <Route path='/listarUsuario' element={<ListarUsuario />}></Route>
      </Routes>

    </>
  )
}

export default App
