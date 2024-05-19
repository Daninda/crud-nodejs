import sqlite from 'sqlite3';

sqlite.verbose();
const db = new sqlite.Database('database.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	age INTEGER NOT NULL
)`);

export default {
  async get(id) {
    try {
      const user = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getAll() {
    try {
      const users = await new Promise((resolve, reject) => {
        db.all('SELECT * FROM users', (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
      return users;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async create(data) {
    try {
      const inserted = await new Promise((resolve, reject) => {
        db.run('INSERT INTO users (name, age) VALUES(?, ?)', [data.name, data.age], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
      });
      return inserted;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async remove(id) {
    try {
      const deleted = await new Promise((resolve, reject) => {
        db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(!!this.changes);
          }
        });
      });
      return deleted;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async update(data) {
    try {
      await new Promise((resolve, reject) => {
        db.run(
          'UPDATE users SET name = ?, age = ? WHERE id = ?',
          [data.name, data.age, data.id],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
      const user = await this.get(data.id);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
