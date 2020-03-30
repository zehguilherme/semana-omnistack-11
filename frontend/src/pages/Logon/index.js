import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'  /*Feather Icons*/

import './styles.css'

import logoImg from '../../assets/logo.svg'
import herosImg from '../../assets/heroes.png'

export default function Logon () {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form action="">
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID" />
          <button className="button" type="submit">Entrar</button>

          <Link to="/register">
            <FiLogIn size={16} color="#e02041"></FiLogIn>  {/*size: altura*/}
          Não tenho cadastro
        </Link>
        </form>
      </section>

      <img src={herosImg} alt="Heroes" />
    </div>
  )
}
