import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Incidents () {
  const [incidents, setIncidents] = useState([])  //começa com array vazio
  const [total, setTotal] = useState(0)  //estado para armazenar o total de itens


  const navigation = useNavigation()  //permite a navegação do usuário

  // Navegar usuário para a página de detalhes de cada caso
  function navigateToDetail () {
    navigation.navigate('Detail')
  }

  // Carregar casos
  async function loadIncidents () {
    const response = await api.get('/incidents')

    setIncidents(response.data)
    setTotal(response.headers['x-total-count'])  //total de casos
  }

  useEffect(() => {
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList
        data={incidents}                       //vetor de dados que monta a lista de itens
        style={styles.incidentList}
        keyExtractor={incident => String(incident.id)}  //usa o id de cada indicent para determinar qual é qual (informação única para cada 1 deles)
        showsVerticalScrollIndicator={false}         //tira a barra que indica o scroll da página
        renderItem={({ item: incident }) => (                          //renderItem: função responsável que armazena cada item da lista
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}.</Text>

            <Text style={styles.incidentProperty}>VALOR:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={navigateToDetail}
            >

              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}
