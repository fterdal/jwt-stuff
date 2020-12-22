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
  for (const [id, user] of Object.entries(users)) {
    if (user.email === email) {
      const hashedPassword = SHA256(password).toString();
      if (user.passwordHash === hashedPassword)
        return {
          id: Number(id),
          email: user.email,
        };
      throw new Error('Authentication Failed');
    }
  }
  throw new Error('User Email Not Found');
}

function findUserById(id) {
  const userWithId = users[id];
  if (!userWithId) throw new Error(`User With id ${id} Not Found`);
  const { passwordHash, ...user } = userWithId; // eslint-disable-line no-unused-vars
  return user;
}

function findUserByEmail(email) {
  for (const [key, value] of Object.entries(users)) {
    if (email === value.email) {
      return {
        id: Number(key),
        email: value.email,
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
  return {
    id: nextId - 1,
    email: users[nextId - 1].email,
  };
}

// console.log('Logged In Successfully!', login('finn@finn.finn', '123'));
// console.log('Signed Up Successfully!', signup('finn@finn.finn2', '123'));
// console.log('Found User!', findUserById(4));

console.log(users);

module.exports = {
  login,
  signup,
  findUserById,
  findUserByEmail,
};
