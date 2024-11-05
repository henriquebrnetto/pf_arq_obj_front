import { Typography, Button, Autocomplete, Pagination, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

function ListarUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [page, setPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [selectedEmail, setSelectedEmail] = useState("")

    useEffect(() => {
        loadUsuarios(page);
        getNumberOfPages();
    }, [page])

    function loadUsuarios(pageN, email) {
        const url = `http://localhost:8081/projeto/v1/usuario?page=${pageN}${email ? `&email=${email}` : ''}`;
        fetch(url, {
            method: 'GET',
        }).then(response => {
            return response.json()
        }).then(data => {
            setUsuarios(data.content)
        }).catch(response => {
            alert('Erro na listagem dos usuarios')
        })
    }

    function deleteUser(id) {
        fetch(`http://localhost:8081/projeto/v1/usuario/${id}`, {
            method: 'DELETE',
        }).then(response => {
            loadUsuarios();
        }).catch(response => {
            alert('Erro na exclusao do usuario')
        })
    }

    function getNumberOfPages() {
        fetch('http://localhost:8081/projeto/v1/usuario/total-pages', {
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

    const emailOptions = usuarios.map(usuario => usuario.email);

    return (
        <>
            <Typography variant="h4">
                Usuarios Cadastrados
            </Typography>

            <Box mt={2}>
                <Autocomplete
                    disablePortal
                    options={emailOptions}
                    onChange={(event, value) => {
                        setSelectedEmail(value);
                        loadUsuarios(page, value);
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Buscar por email" variant="outlined" />
                    )}
                />
            </Box>

            <Box mt={2}>
                <table>
                    <thead>
                        <tr>
                            <th> id -</th>
                            <th>nome -</th>
                            <th>email -</th>
                            <th>cidade -</th>
                            <th>dataNascimento</th>
                            <th>-V-</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? (
                            usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.cidade}</td>
                                    <td>{usuario.dataNascimento}</td>
                                    <td>
                                        <Button variant='contained' color='error' onClick={() => deleteUser(usuario.id)}>Delete</Button>
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

            {usuarios.length > 1 ? (
                <Box mt={2}>
                    <Pagination count={totalPages} page={page + 1} onChange={handlePageChange} />
                </Box>
            ) : (
                <></>
            )}
        </>
    )

}

export default ListarUsuario