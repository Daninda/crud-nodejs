let users = [];
let id = 1;

// async functions here are only needed to quickly replace the data.sqlite.js file to data.js

export default {
  async get(id) {
    const user = users.find(value => value.id === id);
    return user;
  },

  async getAll() {
    return users;
  },

  async create(data) {
    try {
      users.push({ id: +id, name: data.name, age: +data.age });
      return id++;
    } catch (error) {
      return null;
    }
  },

  async remove(id) {
    try {
      const length = users.length;
      users = users.filter(value => value.id !== id);
      return length !== users.length; // return true if some user was deleted
    } catch (error) {
      return null;
    }
  },

  async update(data) {
    try {
      users = users.map(value => {
        if (value.id === data.id) {
          return {
            id: +data.id,
            name: data.name,
            age: +data.age,
          };
        } else {
          return value;
        }
      });
      return await this.get(data.id);
    } catch (error) {
      return null;
    }
  },
};
