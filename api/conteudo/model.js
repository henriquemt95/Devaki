//const mysql = require('../../mysql')
const sqlServer = require('../../sqlServer')
const Request = require('tedious').Request;
var sql = require("mssql"); 
var TYPES = require('tedious').TYPES;  
var Connection = require('tedious').Connection; 

exports.searchAllConteudo = async () => {  
  return new Promise((resolve, reject) =>{
    
    sql.connect(sqlServer, function (err) {
      
      if(err){
        console.log(err);
      } 
      
      // create Request object
      var request = new sql.Request();
      
      // query to the database and get the records
      request.query('select * from Conteudo', function (err, recordset) {
        
        if (err){
          reject(err)
          sql.close()
          
        } 
        
        else{
          // send records as a response
          
          resolve(recordset);
          sql.close()
        }
        
      });
      
    })
    
  })
}

module.exports.searchAllCategoria = async () => {
  return new Promise((resolve, reject) =>{
    
    sql.connect(sqlServer, function (err) {
      
      if(err){
        console.log(err);
      } 
      
      // create Request object
      var request = new sql.Request();
      
      // query to the database and get the records
      request.query('select * from Categoria', function (err, recordset) {
        
        if (err){
          reject(err)
          sql.close()
          
        } 
        
        else{
          // send records as a response
          
          resolve(recordset);
          sql.close()
        }
        
      });
      
    })
    
  })

}

module.exports.insertCategoria = async (categoria) => {
     
    var connection = new Connection(sqlServer);  
    connection.on('connect', function(err) {  
        // If no error, then good to proceed.  
        console.log("Conectado ao Banco", err);  
        executeStatement1();  
    });
    
   
    function executeStatement1() {  
         request = new Request(" insert into categoria (nome) values(@nome)", function(err) {  
         if (err) {  
            console.log(err);}  
        });  
        request.addParameter('nome', TYPES.NVarChar, categoria.nome);  
         
        connection.execSql(request);
        request.on('requestCompleted', function() {  
          
        });       
     }  
}

module.exports.deleteCategoria = async (id) => {
    
      var connection = new Connection(sqlServer);  
      connection.on('connect', function(err) {  
          // If no error, then good to proceed.  
          console.log("Conectado ao Banco", err);  
          executeStatement1();  
      });
      
     
      function executeStatement1() {  
           request = new Request(" delete from Categoria where id = @id ", function(err) {  
           if (err) {  
              console.log(err);}  
          });  

          request.addParameter('id', TYPES.Int, id);    
          connection.execSql(request);
          request.on('requestCompleted', function() {  
            
          });       
       }  

}

module.exports.deleteConteudo = async (id) => {
   
      var connection = new Connection(sqlServer);  
      connection.on('connect', function(err) {  
          // If no error, then good to proceed.  
          console.log("Conectado ao Banco", err);  
          executeStatement1();  
      });
      
     
      function executeStatement1() {  
           request = new Request(" delete from Conteudo where id = @id ", function(err) {  
           if (err) {  
              console.log(err);}  
          });  

          request.addParameter('id', TYPES.Int, id);    
          connection.execSql(request);
          request.on('requestCompleted', function() {  
            
          });       
       }  
      

}

module.exports.insertConteudo = async (conteudo) => {
    
      var connection = new Connection(sqlServer);  
      connection.on('connect', function(err) {  
          // If no error, then good to proceed.  
          console.log("Conectado ao Banco", err);  
          executeStatement1();  
      });
      
     
      function executeStatement1() {  
           request = new Request(" insert into Conteudo (textoPergunta,textoResposta,imgResposta,dtInsert,idCategoria) values(@textoPergunta,@textoResposta,@imgResposta,getdate(),@idCategoria) ", function(err) {  
           if (err) {  
              console.log(err);}  
          });  
          request.addParameter('textoPergunta', TYPES.NVarChar, conteudo.textoPergunta);  
            
          request.addParameter('textoResposta', TYPES.NVarChar, conteudo.textoResposta);  
          request.addParameter('imgResposta', TYPES.NVarChar, conteudo.imgResposta); 
          request.addParameter('idCategoria', TYPES.Int, conteudo.idCategoria);    
          connection.execSql(request);
          request.on('requestCompleted', function() {  
            
          });       
       }  
  
}

module.exports.updateConteudo = async (conteudo) => {

      var connection = new Connection(sqlServer);  
      connection.on('connect', function(err) {  
          // If no error, then good to proceed.  
          console.log("Conectado ao Banco", err);  
          executeStatement1();  
      });
      
     
      function executeStatement1() {  
           request = new Request(` update Conteudo set textoPergunta = @textoPergunta, textoResposta = @textoResposta, 
           imgResposta = @imgResposta, dtInsert = getdate(), idCategoria = @idCategoria where id = @id `, function(err) {  
           if (err) {  
              console.log(err);}  
          });  
       
          request.addParameter('textoPergunta', TYPES.NVarChar, conteudo.textoPergunta) 
            
          request.addParameter('textoResposta', TYPES.NVarChar, conteudo.textoResposta);  
          request.addParameter('imgResposta', TYPES.NVarChar, conteudo.imgResposta); 
          request.addParameter('idCategoria', TYPES.Int, conteudo.idCategoria);               
          request.addParameter('id',TYPES.Int, conteudo.id);  
  
          connection.execSql(request);
          request.on('requestCompleted', function() {  
            
          });       
       }  

      
    
    
  
}

module.exports.updateCategoria = async (categoria) => {

    

      var connection = new Connection(sqlServer);
      connection.on('connect', function(err) {  
          // If no error, then good to proceed.  
          console.log("Conectado ao Banco", err);  
          executeStatement1();  
      });
      
     
      function executeStatement1() {  
           request = new Request(` update Categoria set nome = @nome where id = @id `, function(err) {  
           if (err) {  
              console.log(err);}  
          });  
       
          request.addParameter('nome', TYPES.NVarChar, categoria.nome)           
          request.addParameter('id',TYPES.Int, categoria.id);  
  
          connection.execSql(request);
          request.on('requestCompleted', function() {  
            
          });       
       }  
      
        
        
}

module.exports.existCategorys = async () => {
  return new Promise((resolve, reject) => {

    sql.connect(sqlServer, function (err) {
        
      if(err){
        console.log(err);
      } 
      
      // create Request object
      var request = new sql.Request();
      
      // query to the database and get the records
      request.query(
        `select cont.idCategoria from Conteudo as cont, Categoria as cat where
        cont.idCategoria = cat.id
        group by idCategoria`, function (err, recordset) {
        
        if (err){
          reject(err)
          sql.close()          
        } 
        
        else{         
          resolve(recordset);
          sql.close()
        }
        
      });
      
    })

  })
}

module.exports.ContentByidCategoria = async (idCat) => {

  return new Promise((resolve, reject) =>{

    sql.connect(sqlServer, function (err) {
        
      if(err){
        console.log(err);
      } 
      
      // create Request object
      var request = new sql.Request();
      
      // query to the database and get the records
      request.query(`
      SELECT Conteudo.id,
      Conteudo.textoPergunta,
      Conteudo.textoResposta,
      Conteudo.imgResposta,
      Conteudo.dtInsert,
      Conteudo.idCategoria
      FROM Conteudo where idCategoria =` +idCat, function (err, recordset) {
        
        if (err){
          reject(err)
          sql.close()          
        } 
        
        else{         
          resolve(recordset);
          sql.close()
        }
        
      });
      
    })
  
  })
}

module.exports.searchConteudoById = async (id) => {

  return new Promise((resolve, reject) =>{

  sql.connect(sqlServer, function (err) {
      
    if(err){
      console.log(err);
    } 
    
    // create Request object
    var request = new sql.Request();
    
    // query to the database and get the records
    request.query(`SELECT Conteudo.id,
    Conteudo.textoPergunta,
    Conteudo.textoResposta,
    Conteudo.imgResposta,
    Conteudo.dtInsert,
    Conteudo.idCategoria
    FROM Conteudo where id = ` +id, function (err, recordset) {
      
      if (err){
        reject(err)
        sql.close()
        
      } 
      
      else{
        // send records as a response
        
        resolve(recordset);
        sql.close()
      }
      
    });
    
  })

}
  )}