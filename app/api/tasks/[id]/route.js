import dbConnect from "../../../../lib/dbConnect";
import { NextResponse } from "next/server";

import Task from "../../../../models/Task";

// Connect to the database once when the module is loaded
await dbConnect();

export async function GET(request, { params }) {
  const { id } = await params;
  const todo = await Task.findById(id); // Find todo by ID

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(todo); // Return the found todo
}

export async function PUT(request, { params }) {
  const updatedData = await request.json(); // Get the updated data
  const { id } = await params;

  const updatedTodo = await Task.findByIdAndUpdate(id, updatedData, {
    new: true,
  }); // Update the todo

  if (!updatedTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(updatedTodo); // Return the updated todo
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const deletedTodo = await Task.findByIdAndDelete(id); // Delete the todo

  if (!deletedTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Todo deleted" }); // Return success message
}
