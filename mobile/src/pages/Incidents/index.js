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

  const [page, setPage] = useState(1) //controla o nº da página em que se está no momento - inicia sempre na página 1
  const [loading, setLoading] = useState(false) //armazenar uma informação quando se está buscando dados novos para evitar que eles sejam buscados novamente

  const navigation = useNavigation()  //permite a navegação do usuário

  // Navegar usuário para a página de detalhes de cada caso
  function navigateToDetail (incident) {
    navigation.navigate('Detail', { incident })
  }

  // Carregar casos
  async function loadIncidents () {
    // evitar com que enquanto outra requisição seja feita, com que mais uma requisição venha a acontecer
    if (loading) {
      return
    }

    // Se o total de casos já estiver carregado do banco (carregou pelo menos a 1ª página)
    // && nº incidents da lista for igual ao total
    if (total > 0 && incidents.length === total) {
      return // Não irá buscar mais informações
    }

    setLoading(true)

    const response = await api.get('incidents', {
      params: { page }
    })

    setIncidents([...incidents, ...response.data])  //anexar 2 vetores dentro de apenas 1 (todos os valores que já tem dentro dos casos + todos que vem de response.data)

    setTotal(response.headers['x-total-count'])  //total de casos

    setPage(page + 1)  //pula para a próxima página
    setLoading(false)
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
        showsVerticalScrollIndicator={false}            //tira a barra que indica o scroll da página
        onEndReached={loadIncidents}                    //dispara uma função quando usuário chega no final da lista
        onEndReachedThreshold={0.2}                     //quantos % do final da lista o usuário precisa estar para que sejam carregados novo itens (0 a 1)
        renderItem={({ item: incident }) => (           //renderItem: função responsável que armazena cada item da lista
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
              onPress={() => navigateToDetail(incident)}
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
