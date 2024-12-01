// pages/api/tasks/index.js
import dbConnect from "../../../lib/dbConnect";
import Task from "../../../models/Task";

// Connect to the database
await dbConnect();

export async function GET(req) {
  try {
    const tasks = await Task.find({});
    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json(); // Make sure to parse the request body
    const task = await Task.create(body);
    return new Response(JSON.stringify(task), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Bad Request" }), {
      status: 400,
    });
  }
}
