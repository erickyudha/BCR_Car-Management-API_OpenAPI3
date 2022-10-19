'use strict';

const bcrypt = require("bcryptjs");
const superadmin = require("../../config/superadmin");
const encryption = require("../../config/encryption");

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, encryption.SALT, (err, encrypted_pass) => {
      if (!!err) {
        reject(err);
        return;
      }

      resolve(encrypted_pass);
    });
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const encrypted_pass = await encryptPassword(superadmin.password);

    return queryInterface.bulkInsert('Users', [{
      name: superadmin.name,
      email: superadmin.email,
      encrypted_pass: encrypted_pass,
      role: "superadmin"
    }])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      role: "superadmin"
    }, {});
  }
};
