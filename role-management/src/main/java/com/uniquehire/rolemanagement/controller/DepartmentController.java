package com.uniquehire.rolemanagement.controller;


import com.uniquehire.rolemanagement.dto.request.DepartmentRequest;
import com.uniquehire.rolemanagement.dto.response.ApiResponse;
import com.uniquehire.rolemanagement.dto.response.DepartmentResponse;
import com.uniquehire.rolemanagement.enums.DepartmentName;
import com.uniquehire.rolemanagement.service.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<DepartmentResponse>> addDepartment(
            @Valid @RequestBody DepartmentRequest request) {
        return ResponseEntity.ok(departmentService.addDepartment(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DepartmentResponse>> updateDepartment(
            @PathVariable Long id,
            @Valid @RequestBody DepartmentRequest request) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, request));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAllDepartments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return ResponseEntity.ok(departmentService.getAllDepartments(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DepartmentResponse>> getDepartmentById(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @GetMapping("/name/{departmentName}")
    public ResponseEntity<ApiResponse<DepartmentResponse>> getDepartmentByName(
            @PathVariable DepartmentName departmentName) {
        return ResponseEntity.ok(departmentService.getDepartmentByName(departmentName));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteDepartment(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.deleteDepartment(id));
    }
}