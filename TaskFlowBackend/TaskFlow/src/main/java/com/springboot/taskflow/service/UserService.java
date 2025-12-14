package com.springboot.taskflow.service;

import com.springboot.taskflow.entitiy.User;
import com.springboot.taskflow.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//Bean
@Service
public class UserService
{
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user)
    {
        return userRepository.save(user);
    }

    public User getUserById(Integer id)
    {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
    }



}
