const SHA256 = require('crypto-js/sha256');

const users = {
  1: {
    email: 'finn@finn.finn',
    passwordHash: SHA256('123').toString(),
  },
  2: {
    email: 'ben@ben.ben',
    passwordHash: SHA256('456').toString(),
  },
  3: {
    email: 'jess@jess.jess',
    passwordHash: SHA256('789').toString(),
  },
};

let nextId =
  Object.keys(users).reduce((acc, userId) => {
    userId = Number(userId);
    if (userId > acc) return userId;
    return acc;
  }, -1) + 1;

function login(email, password) {
  for (const user of users) {
    if (user.email === email) {
      const hashedPassword = SHA256(password).toString();
      if (user.password === hashedPassword) return user;
      throw new Error('Authentication Failed');
    }
  }
  throw new Error('User Email Not Found');
}

function findUserById(id) {
  return users[id];
}

function findUserByEmail(email) {
  for (const [key, value] of Object.entries(users)) {
    if (email === value.email) {
      return {
        id: key,
        ...value,
      };
    }
  }
  return null;
}

function signup(email, password) {
  if (findUserByEmail(email)) {
    throw new Error(`Email ${email} Is Already Taken`);
  }
  users[nextId] = {
    email,
    passwordHash: SHA256(password).toString(),
  };
  nextId++;
}

module.exports = {
  login,
  signup,
  findUserById,
  findUserByEmail,
};
