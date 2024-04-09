    //req.body   es un post
    //req.params es un get
    //req.query  es un get

function validatorHandler(schema, property){
  return(req, res, next) =>{
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if(error){
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validatorHandler;

