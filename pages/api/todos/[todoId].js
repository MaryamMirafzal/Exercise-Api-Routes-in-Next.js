import {todos} from "../../../data/todos"

export default function handler (req, res){
    if(req.method === "GET"){
        const { todoId } = req.query;
        const todo = todos.find((todo)=> todo.id == +todoId)
        res.status(200).json(todo);
    }else if( req.method == "PATCH"){
        const { todoId } = req.query;
        const {todo: title} = req.body
        const index = todos.findIndex(todo => todo.id === +todoId)
        todos[index] = { id: todoId , todo: title}
        res.status(200).json(todos)
    }
        
}