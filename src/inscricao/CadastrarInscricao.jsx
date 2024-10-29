import { useEffect, useState } from 'react'
import { Button, Grid2, MenuItem, Select, InputLabel } from '@mui/material';

function CadastrarInscricao() {

  const [usuario, setUsuario] = useState();
  const [evento, setEvento] = useState();
  const [listaUsuario, setListaUsuario] = useState([]);
  const [listaEvento, setListaEvento] = useState([]);


  function click() {

    const data = {
      'usuario':  usuario,
      'evento': evento
    }

    console.log(data)

    fetch('http://localhost:8080/api/v1/inscricao', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      alert('Inscrição feita com sucesso.')
    }).catch(response => {
      alert('Erro na inscrição')
    })

  }

  function loadUsuario() {

    fetch('http://localhost:8080/api/v1/usuario', {
      method: 'GET'
    }).then(response => {
      return response.json()
    }).then(data => {
      setListaUsuario(data.content)
    }).catch(response => {
      alert('Erro')
    })

  }

  function loadEvento() {

    fetch('http://localhost:8080/api/v1/evento', {
      method: 'GET'
    }).then(response => {
      return response.json()
    }).then(data => {
      setListaEvento(data.content)
    }).catch(response => {
      alert('Erro')
    })

  }

  useEffect(() => {loadUsuario()
                loadEvento()}, [])

  return (
    <>

    <Grid2 container spacing={3} direction='column'>

      <Grid2 item xs={12}>
        <InputLabel>Usuário</InputLabel>
        <Select
          fullWidth
          value={usuario}
          label='Usuário'
          onChange={e => setUsuario(e.target.value)}
          style={{ minWidth: 100 }}>
              <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {listaUsuario && listaUsuario.map((usuario, index) => {
                return <MenuItem value={usuario.id}>{usuario.nome}</MenuItem>
                })}
          </Select>
      </Grid2>

      <Grid2 item xs={12}>
        <InputLabel>Evento</InputLabel> 
        <Select
          fullWidth
          value={evento}
          label='Evento'
          onChange={e => setEvento(e.target.value)}
          style={{ minWidth: 100 }}>
              <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {listaEvento && listaEvento.map((evento, index) => {
                return <MenuItem value={evento.id}>{evento.nome}</MenuItem>
                })}
          </Select>
      </Grid2>

      <Grid2 item xs={12}>
        <Button 
          onClick={() => click()}
          variant="contained"
          color="success"
          fullWidth
        >Cadastrar</Button>
      </Grid2>

    </Grid2>
    </>
  )
}

export default CadastrarInscricao