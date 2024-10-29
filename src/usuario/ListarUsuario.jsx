import { useEffect, useState } from 'react'

function ListarBanda() {

  const [lista, setLista] = useState([])

  useEffect(() => {
    load()
  }, [])

  function load() {

    fetch('http://localhost:8080/api/v1/banda', {
      method: 'GET'
    }).then(response => {
      return response.json()
    }).then(data => {
      setLista(data.content)
    }).catch(response => {
      alert('Erro no cadastro da banda')
    })

  }

  return (
    <>
      <br/>
      <table>
        <tr>
          <td>Nome</td>
          <td>País</td>
          <td>Ano Formação</td>
        </tr>
        {lista.map((banda, index) => {

          return <tr>
            <td>{banda.nome}</td>
            <td>{banda.pais}</td>
            <td>{banda.anoFormacao}</td>
          </tr>

        })}

      </table>

      
    </>
  )
}

export default ListarBanda