import { Todo, TodoStatus } from "@Models/Todo";

export const todoService = {

    list: async (
        userId: number,
        query: {
            status?: string;
            page?: number;
            limit?: number;
        }
    ) => {
        const where: any = {
            user_id: userId,
        };

        if (query.status) {
            where.status = query.status;
        }

        // ✅ Pagination only if both page & limit exist
        let options: any = {
            where,
            order: [["created_at", "DESC"]],
        };

        if (query.page && query.limit) {
            const page = Math.max(1, query.page);
            const limit = Math.max(1, query.limit);
            const offset = (page - 1) * limit;

            options.limit = limit;
            options.offset = offset;
        }

        const { rows, count } = await Todo.findAndCountAll(options);

        return {
            success: true,
            code: 200,
            message: "Todo list fetched successfully",
            data: {
                items: rows,
                pagination: query.page && query.limit
                    ? {
                        total: count,
                        page: query.page,
                        limit: query.limit,
                        totalPages: Math.ceil(count / query.limit),
                    }
                    : null,
            },
        };
    },

    create: async (
        userId: number,
        description: string
    ) => {

        const todoPayload: Partial<Todo> = {
            description,
            status: TodoStatus.PENDING,
            user_id: userId,
        };

        const todo = await Todo.create({
            ...todoPayload,
        } as any);

        return {
            success: true,
            code: 201,
            message: "Todo created successfully",
            data: todo,
        };
    },

    update: async (
        id: number,
        userId: number,
        description: string
    ) => {
        const todo = await Todo.findOne({ where: { id, user_id: userId } });

        if (!todo) {
            return {
                success: false,
                code: 404,
                message: "Todo not found",
            };
        }

        todo.description = description;
        await todo.save();

        return {
            success: true,
            code: 200,
            message: "Todo updated successfully",
            data: todo,
        };
    },

    start: async (
        id: number,
        userId: number
    ) => {
        const todo = await Todo.findOne({ where: { id, user_id: userId } });

        if (!todo) {
            return {
                success: false,
                code: 404,
                message: "Todo not found",
            };
        }

        todo.status = TodoStatus.STARTED;
        todo.started_at = new Date();
        await todo.save();

        return {
            success: true,
            code: 200,
            message: "Todo started",
            data: todo,
        };
    },

    complete: async (
        id: number,
        userId: number
    ) => {
        const todo = await Todo.findOne({ where: { id, user_id: userId } });

        if (!todo) {
            return {
                success: false,
                code: 404,
                message: "Todo not found",
            };
        }

        todo.status = TodoStatus.COMPLETED;
        todo.completed_at = new Date();
        await todo.save();

        return {
            success: true,
            code: 200,
            message: "Todo completed",
            data: todo,
        };
    },

    delete: async (
        id: number,
        userId: number
    )=> {
        const deleted = await Todo.destroy({
            where: { id, user_id: userId },
        });

        if (!deleted) {
            return {
                success: false,
                code: 404,
                message: "Todo not found",
            };
        }

        return {
            success: true,
            code: 200,
            message: "Todo deleted successfully",
        };
    },
};
