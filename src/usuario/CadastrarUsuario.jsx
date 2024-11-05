import { useState } from 'react'
import { Button, Grid2, MenuItem, Select, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function CadastrarUsuario() {

  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [cidade, setCidade] = useState();
  const [dataNascimento, setDataNascimento] = useState();

  function click() {

    const data = {
      'nome': nome,
      'email': email,
      'cidade': cidade,
      'dataNascimento': dataNascimento
    }

    console.log(data)

    fetch('http://localhost:8081/projeto/v1/usuario', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      alert('Usuário cadastrada com sucesso')
    }).catch(response => {
      alert('Erro no cadastro da usuário')
    })

  }

  return (
    <>

      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <TextField
            label='Nome: '
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
        </Grid2>

        <Grid2 item xs={6}>
          <TextField
            label='E-mail: '
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Grid2>

        <Grid2 item xs={6}>
          <TextField
            label='Cidade: '
            value={cidade}
            onChange={e => setCidade(e.target.value)}
          />
        </Grid2>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid2 item xs={12}>
            <DatePicker
              label="Data de Nascimento: "
              value={dataNascimento}
              onChange={e => setDataNascimento(e.target.value)}
            />
          </Grid2>
        </LocalizationProvider>


        <Grid2 item xs={12}>
          <Button
            onClick={() => click()}
            variant="contained"
            color="success"
          >Cadastrar</Button>
        </Grid2>

      </Grid2>
    </>
  )
}

export default CadastrarUsuario