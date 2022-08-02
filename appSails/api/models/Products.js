/**
 * Products.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string" },
    price: { type: "number" },
    category: { type: "string" },
    stock: { type: "number" },
    img: { type: "string" },
    description: { type: "string" },
  },
};
