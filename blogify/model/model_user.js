module.exports = (sequelize, dataType) => {
  return sequelize.define('user', {
    id:{
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: dataType.STRING
   })
}
