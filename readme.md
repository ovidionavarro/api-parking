Para ejecutar el proyecto : "npm run dev"  
La api cuenta con 2 bases de datos una en MySQL para llevar la logica del parqueo y otra en Mongodb para guardar los logs  
Se creo una tabla user(usuarios),parking(lleva cada posicion del parqueo y su descripcion) y reserve(guarda la hora de salida y de entrada de un vehiculo y ademas quien solicito la reservacion)  
Se utilizaron modulos como bcryptjs para encriptar las contraseñas,jsonwebtoken la autenticacion, express-validator  la validacion de los campos que recibe la request ,sequelize para conectar y trabajar con MySQL y mongoose con Mongodb ,ademas de otros modulos 
  
Para probar la api : cambiar DATABASEUSER y DATABASEPASSWORD en el archivo .env por los de usted en MySQL ,crear en MySQL una base de datos "parking_db" y listo ejecutar el comando " npm run dev " y entrar a la ruta /auth/login teniendo en el body {  "email":"ovidio2@gmail.com", "password":"ovidio2"} ,que es el usuario por defecto con rol de ADMIN 
