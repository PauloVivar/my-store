const { faker } = require('@faker-js/faker');
const { boom } = require('@hapi/boom');

class UsersService{

  constructor(){
    //array para guardar datos en memora (luego se conectara a BDD)
    this.users = [];
    //se generar los 100 priductos iniciales en el constructor
    this.generate();
  }

  generate(){
    const limit = 20;
    for(let i=0; i<limit; i++){
      this.users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data){
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newuser);
    return newUser;
  }

  async find(){
    return this.users;
  }

  async findOne(id){
    //const name = this.getTotal(); //validar error
    const user = this.users.find(item => item.id === id);
    if(!user){
      throw boom.notFound('usuario no encontrado');
    }
    if(user.isBlock){
      throw boom.conflict('usuario esta bloqueado');
    }
    return user;
  }

  async update(id, changes){
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('usuario no encontrado');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,                            //persistencia
      ...changes
    };
    return this.users[index];
  }

  async delete(id){
    const index = this.users.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('usuario no encontrado');
    }

    this.users.splice(index, 1);
    return {id, message: true};
  }
}

module.exports = UsersService;
