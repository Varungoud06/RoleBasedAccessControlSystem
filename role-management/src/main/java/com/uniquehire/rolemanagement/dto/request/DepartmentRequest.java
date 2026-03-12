package com.uniquehire.rolemanagement.dto.request;

import com.uniquehire.rolemanagement.enums.DepartmentName;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentRequest {

    @NotNull(message = "Department name is required")
    private DepartmentName departmentName;

    @NotNull(message = "Number of trainings is required")
    @Min(value = 0, message = "Number of trainings cannot be negative")
    private Integer numberOfTrainingsGoingOn;

    @NotNull(message = "Description is required")
    @Size(min = 3, max = 500, message = "Description must be between 3 and 500 characters")
    private String description;

}