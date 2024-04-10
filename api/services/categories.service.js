const { faker } = require('@faker-js/faker');
const { boom } = require('@hapi/boom');

class CategoriesService{

  constructor(){
    //array para guardar datos en memora (luego se conectara a BDD)
    this.categories = [];
    //se generar los 100 priductos iniciales en el constructor
    this.generate();
  }

  generate(){
    const limit = 20;
    for(let i=0; i<limit; i++){
      this.categories.push({
        idCategory: faker.datatype.uuid(),
        idProduct: faker.datatype.uuid(),
        description: faker.lorem.paragraph(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data){
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory;
  }

  async find(){
    return this.categories;
  }

  async findOne(id){
    //const name = this.getTotal(); //validar error
    const user = this.categories.find(item => item.id === id);
    if(!user){
      throw boom.notFound('usuario no encontrado');
    }
    if(user.isBlock){
      throw boom.conflict('usuario esta bloqueado');
    }
    return user;
  }

  async update(id, changes){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('usuario no encontrado');
    }
    const user = this.categories[index];
    this.categories[index] = {
      ...user,                            //persistencia
      ...changes
    };
    return this.categories[index];
  }

  async delete(id){
    const index = this.categories.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('usuario no encontrado');
    }

    this.categories.splice(index, 1);
    return {id, message: true};
  }
}

module.exports = CategoriesService;
