package com.uniquehire.rolemanagement.dto.response;

import com.uniquehire.rolemanagement.enums.DepartmentName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentResponse {

    private Long id;
    private DepartmentName departmentName;
    private Integer numberOfTrainingsGoingOn;
    private String description;
}