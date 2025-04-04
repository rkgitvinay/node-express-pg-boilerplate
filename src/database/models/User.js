// models/User.js
const { Model } = require('objection');
const bcrypt = require('bcrypt');
const Role = require('./Role');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role,
        join: {
          from: 'users.role_id',
          to: 'roles.id',
        },
      },
    };
  }

  async $beforeInsert(context) {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async $beforeUpdate(opt, context) {
    if (this.password && opt.patch) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password);
  }
}

module.exports = User;
