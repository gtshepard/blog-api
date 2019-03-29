module.exports = (sequelize, dataType) => {
  return sequelize.define('user', {
    id:{
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: dataType.STRING,
    firstName: dataType.STRING,
    lastName: dataType.STRING,
    email: dataType.STRING,
    passwordHash: dataType.STRING
   })
}
