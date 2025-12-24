import {
    AllowNull,
    AutoIncrement, BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey, Table
} from "sequelize-typescript";
import {User} from "./User";

export enum TodoStatus {
    PENDING = "pending",
    STARTED = "started",
    COMPLETED = "completed"
}

@Table({ tableName: "todos", timestamps: true })
export class Todo extends Model<Todo> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT.UNSIGNED)
    id!: number;

    @AllowNull(false)
    @Column(DataType.TEXT)
    description!: string;

    @AllowNull(false)
    @Column(
        DataType.ENUM(
            TodoStatus.PENDING,
            TodoStatus.STARTED,
            TodoStatus.COMPLETED
        )
    )
    status!: TodoStatus;

    @CreatedAt
    @Column(DataType.DATE)
    created_at!: Date;

    @AllowNull(true)
    @Column(DataType.DATE)
    started_at!: Date | null;

    @AllowNull(true)
    @Column(DataType.DATE)
    completed_at!: Date | null;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.BIGINT.UNSIGNED)
    user_id!: number;

    @BelongsTo(() => User)
    user!: User;
}