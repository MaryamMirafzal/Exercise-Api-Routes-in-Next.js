import {todos} from "../../../data/todos"


export default function handler(req , res){
    if( req.method == "GET"){
        res.status(200).json(todos)
    }else if( req.method == "POST"){
        const { todo } = req.body;
        // Store Data in DB
        const newTodo ={
            id: todos.length + 1,
            title: todo,
        };
        res.status(201).json({
            message:"success",
            data: newTodo,
        })
    }else if( req.method == "DELETE"){
        res.status(200).json({
            message:"All todos deleted",
            data:[],
        })
    }
}