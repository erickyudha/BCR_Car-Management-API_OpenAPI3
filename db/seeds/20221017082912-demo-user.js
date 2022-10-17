'use strict';

const bcrypt = require("bcryptjs");
const SALT = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT, (err, encrypted_pass) => {
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
    const encrypted_pass1 = await encryptPassword("admin");
    const encrypted_pass2 = await encryptPassword("member");

    return queryInterface.bulkInsert('Users', [{
      name: "Super Admin",
      email: "super@admin.com",
      // password = "admin"
      encrypted_pass: encrypted_pass1,
      role: "superadmin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Admin",
      email: "admin@admin.com",
      // password = "admin"
      encrypted_pass: encrypted_pass1,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Member",
      email: "member@member.com",
      // password = "member"
      encrypted_pass: encrypted_pass2,
      role: "member",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
