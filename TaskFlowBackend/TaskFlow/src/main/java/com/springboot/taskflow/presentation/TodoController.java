package com.springboot.taskflow.presentation;

import com.springboot.taskflow.entitiy.Todo;
import com.springboot.taskflow.service.TodoService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
@Slf4j
public class TodoController
{
    @Autowired
    private TodoService todoService;

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Todo Retrived Successfully"),
        @ApiResponse(responseCode = "404", description = "Todo not found")
    })
    @GetMapping("/{id}")
    ResponseEntity<Todo> getTodoById(@PathVariable int id)
    {
        try
        {
            Todo todo = todoService.getTodoById(id);
            return new ResponseEntity<>(todoService.getTodoById(id), HttpStatus.OK);
        }
        catch (RuntimeException e)
        {
            log.info("Error");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    ResponseEntity<List<Todo>> getAllTodo()
    {
        return new ResponseEntity<List<Todo>>(todoService.getAllTodo(),HttpStatus.OK);
    }

    @GetMapping("/page")
    ResponseEntity<Page<Todo>> getPageTodo(@RequestParam int page, @RequestParam int size)
    {
        return new ResponseEntity<>(todoService.getPageTodo(page,size), HttpStatus.OK);
    }

    @PostMapping("/create")
    ResponseEntity<Todo> todoPost(@RequestBody Todo todo)
    {
        Todo todoEntity = todoService.createTodo(todo);
        return new ResponseEntity<>(todoService.createTodo(todo), HttpStatus.CREATED);
    }

    @PutMapping
    ResponseEntity<Todo> updateTodoById(@RequestBody Todo todo)
    {
        return new ResponseEntity<>(todoService.updateTodo(todo), HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    void deleteTodo(@PathVariable int id)
    {
        todoService.deleteTodoById(id);
    }
}
