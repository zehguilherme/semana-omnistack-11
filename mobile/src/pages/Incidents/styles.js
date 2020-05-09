import { StyleSheet } from 'react-native'

import Constants from 'expo-constants'

export default StyleSheet.create({
  container: {
    flex: 1, //ocupar o tamanho inteiro
    paddingHorizontal: 24, //padding nas laterais
    paddingTop: Constants.statusBarHeight + 20  //obtém o tamanho da status bar do aparelho e soma + 20 pixels
  },

  header: {
    flexDirection: 'row',  //colocar em linha - um ao lado do outro
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 15,
    color: '#737380'
  },

  headerTextBold: {
    fontWeight: 'bold'
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: '#13131a',
    fontWeight: 'bold'
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#737380'
  },

  incidentList: {
    marginTop: 32
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16
  },

  incidentProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold'
  },

  incidentValue: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380'
  },

  // Flecha
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  detailsButtonText: {
    color: '#e02041',
    fontSize: 15,
    fontWeight: 'bold'
  },

  /***************************************************************** Dark mode *************************************************************/
  dark: {
    backgroundColor: '#333',
    color: '#fff'
  },

  incidentDark: {
    padding: 24,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#242424'
  },

  incidentPropertyDark: {
    color: '#fff'
  },

  incidentValueDark: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: '#737380'
  }
})
