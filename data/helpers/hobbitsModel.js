const db = require("../dbConfig");

module.exports = {
  get(id) {
    if (id) {
      return db("hobbits")
        .where({ id })
        .first();
    }
    return db("hobbits");
  },

  async insert(hobbit) {
    const [id] = await db("hobbits").insert(hobbit, "id");
    return db("hobbits")
      .where({ id })
      .first();
  },

  async delete(id) {
    const hobbitToDelete = db("hobbits")
      .where({ id })
      .first();

    if (hobbitToDelete) {
      await db("hobbits")
        .delete()
        .where({ id });
      return hobbitToDelete;
    } else {
      return null;
    }
  }
};
