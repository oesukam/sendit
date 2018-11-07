import faker from 'faker';

class BaseModel {
  constructor (arrayName = '') {
    this.arrayName = arrayName; // stores the name of the global variable
  }

  toObject () {
    const fields = { ...this };
    delete fields.arrayName;
    return { ...fields };
  }

  getById (id = '') {
    const items = global[this.dataType] || [];
    
    if (!id || items.length === 0) return null;

    return items.filter(val => val.id = id);
  }

  getAll () {
    return global[this.arrayName] || [];
  }

  save () {
    // Check if the array name was set
    if (!this.arrayName) {
      throw new Error('arrayName not set');
      return;
    }
    if (!this.id) {
      this.id = faker.random.uuid();
    }
    // Check the existance of the array
    if (!global[this.arrayName]) {
      global[this.arrayName] = []; //Initialises the array
    }
    const items = global[this.arrayName];
    // If a user with the same email already exist
    if (items.some(v => v.email === this.email && v.id !== this.id)){
      throw new Error(`${this.email} account already exist`);
      return;
    }
    global[this.arrayName] = [
      ...items,
      this.toObject()
    ];
    return this.toObject();
  }
}

export default BaseModel;