import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UpdateTodoInput } from "@/types/todo";

interface Props {
    params: {
        id: string;
    };
}

// GET a single todo
export async function GET(request: NextRequest, { params }: Props) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const todo = await prisma.todo.findUnique({
            where: { id },
        });

        if (!todo) {
            return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
        }

        return NextResponse.json(todo);
    } catch (error) {
        console.error('Error fetching todo', error);
        return NextResponse.json({ error: 'Failed to fetch todo' }, { status: 500 });
    }
}

// PATCH/UPDATE a todo
export async function PATCH(request: NextRequest, { params }: Props) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const data: UpdateTodoInput = await request.json();

        const todo = await prisma.todo.update({
            where: { id },
            data,
        });

        return NextResponse.json(todo);
    } catch (error) {
        console.error('Error updating todo', error);
        return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
    }
}

// DELETE a todo
export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const todo = await prisma.todo.delete({
            where: { id },
        });

        return NextResponse.json(todo);
    } catch (error) {
        console.error('Error deleting todo', error);
        return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
    }
}