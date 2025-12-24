import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    Unique
} from "sequelize-typescript";
import {Todo} from "./Todo";

interface UserCreationAttributes {
    name: string;
    email: string;
    password: string;
}

@Table({
    tableName: "users",
    timestamps: true,
    underscored: false,
})
export class User extends Model<User, UserCreationAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @AllowNull(false)
    @Unique
    @Column(DataType.STRING)
    email!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password!: string;

    @HasMany(() => Todo)
    todos!: Todo[];
}