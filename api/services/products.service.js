const { faker } = require('@faker-js/faker');
const { boom } = require('@hapi/boom');

class ProductsService{

  constructor(){
    //array para guardar datos en memora (luego se conectara a BDD)
    this.products = [];
    //se generar los 100 priductos iniciales en el constructor
    this.generate();
  }

  generate(){
    //const {size} = req.query;
    //const limit = size || 10;
    const limit = 100;
    for(let i=0; i<limit; i++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
      // res.json([ {name: "Zapatos", price: 300}, {name: "Chaqueta", price: 100} ]);
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return this.products;
  }

  async findOne(id){
    //const name = this.getTotal(); //validar error
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('Producto no encontrado');
    }
    if(product.isBlock){
      throw boom.conflict('Producto esta bloqueado');
    }
    return product;
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      //throw new Error('Producto no encontrado');
      throw boom.notFound('Producto no encontrado');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,                            //persistencia
      ...changes
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Producto no encontrado');
    }

    this.products.splice(index, 1);
    return {id, message: true};
  }
}

module.exports = ProductsService;
