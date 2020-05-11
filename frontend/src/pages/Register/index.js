import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { mask, unMask } from 'remask'

import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Register () {
  // Criação de estados para cada um dos inputs
  const [name, setName] = useState('')          //Nome da ONG: input de texto -> inicia com valor vazio ''
  const [email, setEmail] = useState('')        //Email
  const [whatsapp, setWhatsapp] = useState('')  //Whatsapp
  const [city, setCity] = useState('')          //Cidade
  const [uf, setUf] = useState('')              //UF

  const history = useHistory()

  // Responsável pelo cadastro do usuário - disparada quando o form der 'submit'
  async function handleRegister (e) {
    e.preventDefault()  //vai previnir o comportamento padrão do form (recarregar página toda)

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    }

    // Se deu certo
    try {
      const response = await api.post('/ongs', data)

      alert(`Seu ID de acesso: ${response.data.id}`)

      history.push('/')  //usuário é enviado para a página de Login
    } catch (error) {
      alert('Erro no cadastro, tente novamente')
    }

  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>

          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>  {/*size: altura*/}
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            required={true}
            maxLength={40}
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={
              e => setWhatsapp(
                mask(
                  unMask(e.target.value), ['(99) 9999-9999', '(99) 9 9999-9999']
                )
              )
            }
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={
                e => setUf(
                  mask(
                    unMask(e.target.value), ['AA']
                  ).toUpperCase()
                )
              }
            />

          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
