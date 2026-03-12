package com.uniquehire.rolemanagement.service;
//
//import com.uniquehire.departmentservice.dto.request.DepartmentRequest;
//import com.uniquehire.departmentservice.dto.response.ApiResponse;
//import com.uniquehire.departmentservice.dto.response.DepartmentResponse;
//import com.uniquehire.departmentservice.enums.DepartmentName;

import com.uniquehire.rolemanagement.dto.request.DepartmentRequest;
import com.uniquehire.rolemanagement.dto.response.ApiResponse;
import com.uniquehire.rolemanagement.dto.response.DepartmentResponse;
import com.uniquehire.rolemanagement.enums.DepartmentName;

import java.util.Map;

public interface DepartmentService {

    ApiResponse<DepartmentResponse> addDepartment(DepartmentRequest request);

    ApiResponse<DepartmentResponse> updateDepartment(Long id, DepartmentRequest request);

    ApiResponse<Map<String, Object>> getAllDepartments(int page, int size);

    ApiResponse<DepartmentResponse> getDepartmentById(Long id);

    ApiResponse<DepartmentResponse> getDepartmentByName(DepartmentName departmentName);

    ApiResponse<String> deleteDepartment(Long id);
}
