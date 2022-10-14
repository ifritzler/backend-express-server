const fs = require("fs/promises");
const path = require("path");
class Contenedor {
  constructor(fileName) {
    this.fileName = fileName;
    this.path = path.resolve(__dirname, "../", this.fileName);
  }

  async save(data) {
    try {
      const resultPromise = await fs.readFile(this.path, {
        encoding: "utf-8",
      });

      const results = await JSON.parse(resultPromise);
      const id = results.length + 1;

      results.push({ id, ...data });
      await fs.writeFile(this.path, JSON.stringify(results));

      return id;
    } catch (error) {
      await fs.writeFile(this.path, JSON.stringify([{ id: 1, ...data }]));
      return 1;
    }
  }
  async getById(id) {
    try {
      const resultPromise = await fs.readFile(this.path, {
        encoding: "utf-8",
      });
      const results = await JSON.parse(resultPromise);
      return results.find((item) => item.id === id) || null;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAll() {
    try {
      const resultPromise = await fs.readFile(this.path, {
        encoding: "utf-8",
      });
      return await JSON.parse(resultPromise);
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteById(id) {
    try {
      const resultPromise = await fs.readFile(this.path, {
        encoding: "utf-8",
      });
      const results = await JSON.parse(resultPromise);
      const filteredData = results.filter((item) => item.id !== id);
      await fs.writeFile(this.path, JSON.stringify(filteredData));
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteAll() {
    try {
      await fs.writeFile(this.path, "[]");
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Contenedor;
