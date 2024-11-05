import { Typography, Button, Autocomplete, Pagination, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function ListarInscricao() {
  const [inscricoes, setInscricoes] = useState([]);
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [selectedUser, setSelectedUser] = useState("")
  const [selectedEvent, setSelectedEvent] = useState("")

  useEffect(() => {
    loadInscricoes(page, "", "");
    getNumberOfPages();
  }, [page])

  function loadInscricoes(pageN, id_evento, id_usuario) {
    const url = `http://localhost:8081/projeto/v1/inscricao${id_evento != "" ? `/evento/${id_evento}` : ''}${id_usuario != "" ? `/usuario/${id_usuario}` : ''}?page=${pageN}`;
    fetch(url, {
      method: 'GET',
    }).then(response => {
      return response.json()
    }).then(data => {
      setInscricoes(data.content)
    }).catch(response => {
      alert('Erro na listagem das Inscricoes')
    })
  }

  function deleteInscricao(id) {
    fetch(`http://localhost:8081/projeto/v1/inscricao/${id}`, {
      method: 'DELETE',
    }).then(response => {
      loadInscricoes();
    }).catch(response => {
      alert('Erro na exclusao do inscricao')
    })
  }

  function getNumberOfPages() {
    fetch('http://localhost:8081/projeto/v1/inscricao/total-pages', {
      method: 'GET',
    }).then(response => {
      return response.json()
    }).then(data => {
      setTotalPages(data.content)
    }).catch(response => {
      alert('Erro ao requerir numero total de paginas')
    })
  }

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  const userOptions = inscricoes.map(inscricao => inscricao.usuario);
  const eventOptions = inscricoes.map(inscricao => inscricao.evento);

  return (
    <>
      <Typography variant="h4">
        Inscricoes Cadastradas
      </Typography>

      <Box mt={2}>
        <Autocomplete
          disablePortal
          options={userOptions}
          onChange={(event, value) => {
            setSelectedUser(value);
            loadInscricoes(page, selectedEvent, selectedUser);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Buscar por usuario" variant="outlined" />
          )}
        />
      </Box>

      <Box mt={2}>
        <Autocomplete
          disablePortal
          options={eventOptions}
          onChange={(event, value) => {
            setSelectedEvent(value);
            loadInscricoes(page, selectedEvent, selectedUser);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Buscar por evento" variant="outlined" />
          )}
        />
      </Box>

      <Box mt={2}>
        <table>
          <thead>
            <tr>
              <th> id -</th>
              <th>usuario -</th>
              <th>evento -</th>
              <th>-V-</th>
            </tr>
          </thead>
          <tbody>
            {inscricoes.length > 0 ? (
              inscricoes.map((inscricao) => (
                <tr key={inscricao.id}>
                  <td>{inscricao.id}</td>
                  <td>{inscricao.usuario}</td>
                  <td>{inscricao.evento}</td>
                  <td>
                    <Button variant='contained' color='error' onClick={() => deleteUser(inscricao.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Box>

      {inscricoes.length > 1 ? (
        <Box mt={2}>
          <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} />
        </Box>
      ) : (
        <></>
      )}
    </>
  )

}

export default ListarInscricao