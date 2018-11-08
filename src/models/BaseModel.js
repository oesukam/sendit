import faker from 'faker';

class BaseModel {
  constructor(arrayName = '') {
    this.arrayName = arrayName; // stores the name of the global variable
  }

  toObject(withHidden = false) {
    const fields = { ...this };
    const hidden = [...fields.hidden];
    delete fields.arrayName;
    delete fields.hidden;
    if (!withHidden) {
      // Delete all hidden properties before returning the object
      hidden.forEach((value) => {
        if (fields[value] !== undefined) {
          delete fields[value];
        }
      });
    }
    return { ...fields };
  }

  getById(id = '') {
    const items = global[this.dataType] || [];
    if (!id || items.length === 0) return null;

    return items.filter(val => val.id === id);
  }

  getAll() {
    return global[this.arrayName] || [];
  }

  updateDate() {
    // Set created at date
    if (!this.createdAt) {
      this.createdAt = Date.now();
      this.updatedAt = this.createdAt;
    } else {
      this.createdAt = Date.now();
    }
  }

  save(withHidden = false) {
    // Check if the array name was set
    if (!this.arrayName) {
      throw new Error('arrayName not set');
    }
    if (!this.id) {
      this.id = faker.random.uuid();
    }
    // Check the existance of the array
    if (!global[this.arrayName]) {
      global[this.arrayName] = []; // Initialises the array
    }
    const items = global[this.arrayName];
    // If a user with the same email already exist
    if (items.some(v => v.email === this.email && v.id !== this.id)) {
      throw new Error(`${this.email} account already exist`);
    }

    this.updateDate();

    global[this.arrayName] = [
      ...items,
      this.toObject(withHidden),
    ];
    return this.toObject();
  }
}

export default BaseModel;
