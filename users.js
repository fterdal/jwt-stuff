const SHA256 = require("crypto-js/sha256");

function login(email, password) {
  for (const user of users) {
    if (user.email === email) {
      const hashedPassword = SHA256(password).toString()
      if (user.password === hashedPassword) return user
      throw new Error("Authentication Failed")
    }
  }
  throw new Error("User Email Not Found")
}

const users = {
  1: {
    email: 'finn@finn.finn',
    // passwordHash: 
  }
}

module.exports = users;
