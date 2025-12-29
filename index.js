import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 8011;

const TODO_APP = ["Task-1", "Task-2", "Task-3"]

app.get("/", (req, res) => {
    return res.json({
        success: true,
        messege: "Server is running"
    })
});

app.get("/health", (req,res) =>{
    return res.json({
        success: true,
        messege: "server is healthy",
    })
});

app.get("/todos", (req, res) => {
    return res.json({
        success: true,
        data: TODO_APP,
        messege: "All todos successfully fetched"
    })
});

app.post("/todos", (req, res) => {
    const {todoItem} = req.body;

    if(!todoItem){
        return res.json({
        success: false,
        messege: "Todo item is required",
        })
    } 

    TODO_APP.push(todoItem);

        return res.json({
        success: true,
        messege: "Todo item successfully added",
    })
});

app.delete("/todos", (req, res) => {
    const {todoItem} = req.body;

    const todoIndex = TODO_APP.indexOf(todoItem);

    if(todoIndex === -1){
        return res.json({
            success: false,
            messege: "Todo item is not found",
        })
    }else{
        TODO_APP.splice(todoIndex, 1);

        return res.json({
            success: true,
            data: TODO_APP,
            messege: "Todo item successfully deleted",
        })
    }
});

app.put('/todos', (req, res) => {
    const {oldTodoItem, newTodoItem} = req.body;

    const todoIndex = TODO_APP.indexOf(oldTodoItem);

    if(todoIndex === -1){
        return res.json({
            success: false,
            messege: "Todo item is not found",
        })
    }else{
        TODO_APP[todoIndex] = newTodoItem;
        return res.json({
            success: true,
            data: TODO_APP,
            messege: "Todo item successfully updated",
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})