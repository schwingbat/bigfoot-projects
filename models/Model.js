module.exports = class Model {
	constructor({ table, schema, data }) {
		this.table = table;
		this.schema = schema;
		this.applyProps(data);
	}

	applyProps(props) {
    for (const d in props) {
      for (const s in this.schema) {
        if (this.schema[s].column.toLowerCase() === d.toLowerCase()) {
          this[s] = props[d];
        }
      }
    }
  }

  columnNames() {
    const cols = [];
    for (const key in this.schema) {
      const v = this.schema[key];
      if (v && v.column) {
        cols.push(v.column);
      }
    }
    return cols;
  }

  validate() {
    // Check current values against schema.
    const errs = [];

    for (const key in this.schema) {
      if (this.schema[key].required && (!this[key] || this[key] == null)) {
        errs.push(`Property ${key} is required. Current value is ${this[key]}.`);
        continue;
      }
    }

    return {
      valid: errs.length === 0,
      err: 'Failed to validate: ' + errs.join(' / '),
    };
  }

	sync() {
    return new Promise((resolve, reject) => {
      const { valid, err } = this.validate();
      if (!valid) {
        return reject(err);
      }

      const props = {};
      for (const key in this.schema) {
        if (this[key]) {
          props[this.schema[key].column] = this[key];
        }
      }

      if (this.id) {
        db(this.table)
          .update(props)
          .where({ id: this.id })
          .returning(this.columnNames())
          .then(cols => {
            this.applyProps(cols);
            return resolve(this);
          })
          .catch(reject);
      } else {
        db(this.table)
          .insert(props)
          .returning(this.columnNames())
          .then(cols => {
            this.applyProps(cols);
            return resolve(this);
          })
          .catch(reject);
      }
    });
	}
}
