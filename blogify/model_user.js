module.exports(sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
     Username: DataTypes.STRING,
     firstName: DataTypes.STRING,
     lastName: DataTypes.STRING,
     email: DataTypes.STRING,
     password_harsh: DataTypes.STRING
    }, 
    {
      freezeTableName: true,
    }
  );

  User.associate = (models) => {
    User.hasMany(models.post);
  };
  
  return User;
}
