/**
 * This is base model that must be extened by all models
 */
const knex = require("../commons/knex");
const { Model } = require("objection");
const ChunkQueryBuilder = require("./chunkQueryBuilder");
const date = require("../commons/date");

Model.knex(knex); // pass the knex instance to Objection

class Base extends Model {
  static get QueryBuilder() {
    return ChunkQueryBuilder;
  }

  $beforeInsert() {
    this.created_at = date.nowString();
    this.updated_at = date.nowString();
  }

  $beforeUpdate() {
    this.updated_at = date.nowString();
  }
}

module.exports = Base;
