import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CreateTodoInput }  from '@/types/todo';
import { create } from "domain";

// GET all todos
export async function GET() {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { created_at: 'desc' },
        });
    
        return NextResponse.json(todos);
    } catch (error) {
        console.error('Error fetching todos', error);
        return NextResponse.json({ error: 'Failed to fetch todos'}, {status: 500});
    }
   
}

// POST a new todo
export async function POST(request: NextRequest) {
    try {
        const data: CreateTodoInput = await request.json();

        if (!data.title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const todo = await prisma.todo.create({
            data: {
                title: data.title,
                description: data.description,
            },
        });

        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        console.error('Error creating todo', error);
        return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 });
    }
}