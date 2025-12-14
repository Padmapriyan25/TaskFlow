package com.springboot.taskflow.entitiy;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Entity
@Data
public class Todo
{
    @Id
    @GeneratedValue
    Integer id;
    @NotNull
    @NotBlank
            @Schema(name = "title", description = "Example")
    String title;
    @jakarta.validation.constraints.NotNull
    Boolean isCompleted;
}
