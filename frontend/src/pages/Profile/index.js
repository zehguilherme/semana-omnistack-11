import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Profile () {

  const [incidents, setIncidents] = useState([]) //buscar um conjunto de info do backend, array deve ser vazio []

  const history = useHistory()

  // Busca o nome da ONG já salvo localmente
  const ongId = localStorage.getItem('ongId')
  const ongName = localStorage.getItem('ongName')

  // Disparar uma função em algum determinado momento do componente
  useEffect(() => {
    api.get('profile', {
      heads: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId])

  // Deletar um caso
  async function handleDeleteIncident (id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      // filtro em todos os casos (para cada um deles é mantido apenas os casos em que o id for diferente do id do caso que foi deletado no momento)
      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (error) {
      alert('Erro ao deletar caso, tente novamente.')
    }
  }

  // Logout
  function handleLogout () {
    localStorage.clear()  //limpar todos os dados do localstore (salvos no navegador)

    history.push('/')  //redireciona usuário para página de login
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />

        <span>Bem vinda {ongName}</span>

        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041"></FiPower>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {/* Percorrer cada caso retornando algo */}
        {incidents.map(incident => (
          // key: ajuda o react a encontrar qual item é qual ao necessitar deletar, modificar, trocar de posição, etc
          // id: valor unico para identificar todos os casos
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

            <button onClick={() => handleDeleteIncident} type="button">
              <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
