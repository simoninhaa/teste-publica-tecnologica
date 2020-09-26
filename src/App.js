import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import data from './data'
function App() {
  const [jogos, setJogos] = useState(data)
  const { handleSubmit, reset, register, setValue } = useForm()

  function submit(data) {
    var jogo = { codigo: jogos.length + 1, ...data }
    setJogos([...jogos, jogo])
    reset()
  }

  function editar(jogo) {
    setValue("placar", jogo.placar)
    setValue("minTemporada", jogo.minTemporada)
    setValue("maxTemporada", jogo.maxTemporada)
    setValue("quebraMinTemporada", jogo.quebraMinTemporada)
    setValue("quebraMaxTemporada", jogo.quebraMaxTemporada)
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit(submit)}>
        <input name="placar" placeholder="placar" ref={register} />
        <input name="minTemporada" placeholder="minTemporada" ref={register} />
        <input name="maxTemporada" placeholder="maxTemporada" ref={register} />
        <input name="quebraMinTemporada" placeholder="quebraMinTemporada" ref={register} />
        <input name="quebraMaxTemporada" placeholder="quebraMaxTemporada" ref={register} />
        <button>salvar</button>
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
                <button type="button" onClick={() => editar(jogo)}>editar</button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}

export default App;
