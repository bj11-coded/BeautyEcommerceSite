const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Users', [{
        name: 'Admin',
        email: 'admin123@gmail.com',
        password:bcrypt.hashSync('admin123',10)
     }], {});
  
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('users', null, {});
     
  }
};
