import { DataTypes, Model, Sequelize } from 'sequelize';

class Todo extends Model {
  public id!: number;
  public text!: string;
  public completed!: boolean;
}

const setupModels = (sequelize: Sequelize) => {
  Todo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Todo',
    }
  );
};

export { Todo, setupModels };
