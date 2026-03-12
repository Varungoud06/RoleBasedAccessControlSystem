package com.uniquehire.rolemanagement.entity;

import com.uniquehire.rolemanagement.enums.DepartmentName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "department_name", nullable = false, unique = true)
    private DepartmentName departmentName;

    @Column(name = "number_of_trainings_going_on", nullable = false)
    private Integer numberOfTrainingsGoingOn;

    @Column(name = "description", nullable = false, length = 500)
    private String description;
}