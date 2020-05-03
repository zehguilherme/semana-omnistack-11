/* eslint-disable no-undef */
const generateUniqueId = require('../../src/utils/generateUniqueId')

// Caracterização do teste
describe('Generate Unique ID', () => {
  it('should generate an unique ID', () => {
    const id = generateUniqueId()

    // espera-se que algo aconteça
    expect(id).toHaveLength(8)  //tenha 8 caracteres
  });

});
