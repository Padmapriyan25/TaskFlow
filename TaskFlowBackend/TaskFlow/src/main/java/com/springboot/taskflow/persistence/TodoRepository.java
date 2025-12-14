package com.springboot.taskflow.persistence;

import com.springboot.taskflow.entitiy.Todo;
import com.springboot.taskflow.entitiy.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

//CRUD
public interface TodoRepository extends JpaRepository<Todo, Integer>
{

}
