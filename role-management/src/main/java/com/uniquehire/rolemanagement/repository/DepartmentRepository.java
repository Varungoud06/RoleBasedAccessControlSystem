package com.uniquehire.rolemanagement.repository;

//import com.uniquehire.departmentservice.enums.DepartmentName;
//import com.uniquehire.departmentservice.model.Department;
import com.uniquehire.rolemanagement.entity.Department;
import com.uniquehire.rolemanagement.enums.DepartmentName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    Optional<Department> findByDepartmentName(DepartmentName departmentName);

    boolean existsByDepartmentName(DepartmentName departmentName);
}