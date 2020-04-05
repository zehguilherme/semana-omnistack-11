import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'  /*Feather Icons*/

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png'

export default function Logon () {
  const [id, setId] = useState('')

  const history = useHistory()

  // Responsável pelo login do usuário - disparada quando o form der 'submit'
  async function handleLogin (e) {
    e.preventDefault()  //vai previnir o comportamento padrão do form (recarregar página toda)

    try {
      const response = await api.post('/sessions', { id })  //enviar o id da ONG que está querendo logar

      // Salvar localmente no navegador
      localStorage.setItem('ongId', id)
      localStorage.setItem('ongName', response.data.name)

      // Enviar usuário para página de listagem de casos (Profile)
      history.push('/profile')

    } catch (error) {
      alert('Falha no login, tente novamente.')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />

          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041"></FiLogIn>  {/*size: altura*/}
          Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={herosImg} alt="Heroes" />
    </div>
  )
}
