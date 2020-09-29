import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'

import data from './data'
function App() {
  const [jogos, setJogos] = useState(data)
  const [editar, setEditar] = useState(false)
  const [jogoSelecionado, setJogoSelecionado] = useState()
  const [totalRecorde, setTotalRecorde] = useState(0)
  const [minTemporadas, setMinTemporadas] = useState(0)
  const [maxTemporadas, setMaxTemporadas] = useState(0)
  const { handleSubmit, reset, register, setValue } = useForm()

  function submit(data) {
    if (jogoSelecionado) {
      let jogosAlterados = jogos.flatMap(jogo => {
        if (jogo.codigo === jogoSelecionado.codigo) {
          jogo.maxTemporada = data.maxTemporada
          jogo.minTemporada = data.minTemporada
          jogo.placar = data.placar
          jogo.quebraMaxTemporada = data.quebraMaxTemporada
          jogo.quebraMinTemporada = data.quebraMinTemporada
        }
        return jogo
      })
      setJogoSelecionado(null)
      setEditar(false)
      setJogos(jogosAlterados)
    } else {
      var jogo = { codigo: jogos.length + 1, ...data }
      setJogos([...jogos, jogo])

    }

    reset()
  }

  function handleEditar(jogo) {
    setEditar(true)
    setJogoSelecionado(jogo)
    setValue("placar", jogo.placar)
    setValue("minTemporada", jogo.minTemporada)
    setValue("maxTemporada", jogo.maxTemporada)
    setValue("quebraMinTemporada", jogo.quebraMinTemporada)
    setValue("quebraMaxTemporada", jogo.quebraMaxTemporada)
  }

  function calculoRecorde(jogos) {
    var vezes = 0
    jogos.map(jogo => {
      vezes += parseInt(jogo.quebraMinTemporada)
      vezes += parseInt(jogo.quebraMaxTemporada)
    })
    setTotalRecorde(vezes)
  }

  function calculoMinMaxTemporadas(jogos) {
    var valores = []
    jogos.map(jogo => {
      valores.push(jogo.placar)
    })
    setMinTemporadas(Math.min(...valores))
    setMaxTemporadas(Math.max(...valores))
  }
  useEffect(() => {
    calculoRecorde(jogos)
    calculoMinMaxTemporadas(jogos)
  }, [jogos])
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submit)}>
        <input type="number" required name="placar" placeholder="placar" ref={register} />
        <input type="number" required name="minTemporada" placeholder="minTemporada" ref={register} />
        <input type="number" required name="maxTemporada" placeholder="maxTemporada" ref={register} />
        <input type="number" required name="quebraMinTemporada" placeholder="quebraMinTemporada" ref={register} />
        <input type="number" required name="quebraMaxTemporada" placeholder="quebraMaxTemporada" ref={register} />
        <button>{editar ? 'alterar' : 'salvar'}</button>
      </form>
      <table border="1">
        <thead>
          <tr>
            <th>
              codigo
            </th>
            <th>
              placar
            </th>
            <th>
              minTemporada
            </th>
            <th>
              maxTemporada
            </th>
            <th>
              quebraMintemporada
            </th>
            <th>
              quebraMaxtemporada
            </th>
            <th>

            </th>
          </tr>
        </thead>
        <tbody>
          {jogos.length && jogos.map(jogo => (
            <tr key={jogo.codigo}>
              <td> {jogo.codigo}</td>
              <td> {jogo.placar}</td>
              <td> {jogo.minTemporada}</td>
              <td> {jogo.maxTemporada}</td>
              <td> {jogo.quebraMinTemporada}</td>
              <td> {jogo.quebraMaxTemporada}</td>
              <td>
                <button type="button" onClick={() => handleEditar(jogo)}>editar</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      <ul>
        <li>total quebra de recorde: {totalRecorde}</li>
        <li>total minimo temporada: {minTemporadas}</li>
        <li>total maximo temporada: {maxTemporadas}</li>
      </ul>
    </div>
  );
}

export default App;
