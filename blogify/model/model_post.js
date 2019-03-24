module.exports = (sequelize, dataType) => {
  return sequelize.define('post', {
    id:{
      type: dataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  })
}
