import faker from 'faker';

class BaseModel {
  constructor(args = '') {
    this.arrayName = ''; // stores the name of the global variable
    if (args) this.updateFields(args);
  }

  toObject({ withHidden = false } = {}) {
    const fields = { ...this };
    let hidden;
    if (this.hidden !== undefined) {
      hidden = [...fields.hidden];
    }
    if (this.arrayName !== undefined) {
      delete fields.arrayName;
    }
    if (this.hidden !== undefined) {
      delete fields.hidden;
    }
    if (!withHidden && hidden) {
      // Delete all hidden properties before returning the object
      hidden.forEach((value) => {
        if (fields[value] !== undefined) {
          delete fields[value];
        }
      });
    }
    return { ...fields };
  }

  // Filter items by id
  findById(id = '') {
    if (!id) return null;
    let items = [];
    if (global[this.arrayName] !== undefined) {
      items = [...global[this.arrayName]];
    }
    if (!id || items.length === 0) return null;
    const item = items.filter(val => val.id === id)[0] || null;
    this.updateFields(item);
    return this;
  }

  // Update given proterties
  updateFields(fields = '') {
    if (fields) {
      const keys = Object.keys(fields);
      keys.forEach((key) => {
        if (fields[key] !== undefined) {
          this[key] = fields[key];
        }
      });
    }
  }

  // Returns all items or an empty array
  getAll({ keywords = '', page = 1, userId = '' } = {}) {
    if (!this.arrayName) return [];
    let items = global[this.arrayName] || [];
    if (keywords) {
      items = items.filter((item) => {
        const keys = Object.keys(item);
        for (let i = 0; i < keys.length; i += 1) {
          const val = (item[keys[i]] || '').toString().toLowerCase();
          if (keywords.toString().toLowerCase().includes(val) && val) {
            if (userId) {
              return userId === item.userId;
            }
            return true;
          }
        }
        return false;
      });
    }
    const limit = 25;
    const startAt = (page - 1) * limit;
    const endAt = (page * limit) - 1;
    return items.slice(startAt, endAt);
  }

  // Updates createdAt and updatedAt date
  updateDate() {
    // Set created at date
    if (!this.createdAt) {
      this.createdAt = Date.now();
      this.updatedAt = this.createdAt;
    } else {
      this.createdAt = Date.now();
    }
  }

  // Save properies to the array
  save({ withHidden = false } = {}) {
    return new Promise(async (resolve, reject) => {
      // Check if the array name was set
      if (!this.id) {
        this.id = faker.random.uuid();
      }
      // Check the existance of the array
      if (!global[this.arrayName]) {
        global[this.arrayName] = []; // Initialises the array
      }
      let items = global[this.arrayName];
      if (this.arrayName === 'users') {
        // If a user with the same email already exist
        if (items.some(v => v.email === this.email && v.id !== this.id)) {
          reject(new Error(`${this.email} account already exist`));
        }
        this.updateDate();
        items = items.map((item) => {
          if (item.email === this.email) {
            return this.toObject({ withHidden: true });
          }
          return item;
        });
        global[this.arrayName] = [...items, this.toObject({ withHidden: true })];
      } else {
        this.updateDate();
        // Add new item to the array without mutating
        global[this.arrayName] = [
          ...items,
          this.toObject({ withHidden: true }),
        ];
      }
      resolve(this.toObject({ withHidden }));
    });
  }
}

export default BaseModel;
