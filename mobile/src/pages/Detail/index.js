import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image, Text, View, TouchableOpacity, Linking } from 'react-native'
import * as MailComposer from 'expo-mail-composer'
import { useColorScheme } from 'react-native-appearance'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Detail () {
  const navigation = useNavigation()
  const route = useRoute()  //pega informações específicas da página atual da aplicação

  const theme = useColorScheme()

  const incident = route.params.incident
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`

  // Navegar usuário de volta para a página de casos
  function navigateBack () {
    navigation.goBack()
  }

  // Enviar e-mail através do clique no botão
  function sendMail () {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`, //assunto da mensagem
      recipients: [incident.email], //para quem o e-mail será enviado
      body: message //conteúdo da mensagem
    })
  }

  // Enviar whatsapp
  function sendWhatsapp () {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  return (
    <View style={[styles.container, styles[theme]]}>
      <View style={[styles.header, styles[theme]]}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color='#e02041' />
        </TouchableOpacity>
      </View>

      <View style={[theme == 'light' ? styles.incident : styles.incidentDark]}>
        <Text style={[theme == 'light' ? [styles.incidentProperty, { marginTop: 0 }] : [styles.incidentPropertyDark, { marginTop: 0 }]]}>ONG:</Text>
        <Text style={[theme == 'light' ? styles.incidentValue : styles.incidentValueDark]}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={[theme == 'light' ? styles.incidentProperty : styles.incidentPropertyDark]}>CASO:</Text>
        <Text style={[theme == 'light' ? styles.incidentValue : styles.incidentValueDark]}>{incident.title}.</Text>

        <Text style={[theme == 'light' ? styles.incidentProperty : styles.incidentPropertyDark]}>VALOR:</Text>
        <Text style={[theme == 'light' ? styles.incidentValue : styles.incidentValueDark]}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(incident.value)}
        </Text>
      </View>

      <View style={[theme == 'light' ? styles.contactBox : styles.contactBoxDark]}>
        <Text style={[theme == 'light' ? styles.heroTitle : styles.heroTitleDark]}>Salve o dia!</Text>
        <Text style={[theme == 'light' ? styles.heroTitle : styles.heroTitleDark]}>Seja o herói desse caso.</Text>

        <Text style={[theme == 'light' ? styles.heroDescription : styles.heroDescriptionDark]}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
