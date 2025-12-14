package com.springboot.taskflow.service;

import com.springboot.taskflow.entitiy.Todo;
import com.springboot.taskflow.persistence.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

//Bean
@Service
public class TodoService
{
    @Autowired
    private TodoRepository todoRepository;

    public Todo createTodo(Todo todo)
    {
        return todoRepository.save(todo);
    }

    public Todo getTodoById(Integer id)
    {
        return todoRepository.findById(id).orElseThrow(() -> new RuntimeException("Todo Not Found"));
    }

    public List<Todo> getAllTodo()
    {
        return todoRepository.findAll();
    }

    public Page<Todo> getPageTodo(int page, int size)
    {
        Pageable pageable = PageRequest.of(page,size);
        return todoRepository.findAll(pageable);
    }

    public Todo updateTodo(Todo todo)
    {
        return todoRepository.save(todo);
    }

    public void deleteTodo(Integer id)
    {
        todoRepository.delete(getTodoById(id));
    }

    public void deleteTodoById(Integer id)
    {
        todoRepository.deleteById(id);
    }

    public void deleteById(Todo todo)
    {
        todoRepository.delete(todo);
    }
}
