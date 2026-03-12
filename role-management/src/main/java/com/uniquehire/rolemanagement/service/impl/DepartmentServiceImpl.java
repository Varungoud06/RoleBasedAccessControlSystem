package com.uniquehire.rolemanagement.service.impl;

import com.uniquehire.rolemanagement.dto.request.DepartmentRequest;
import com.uniquehire.rolemanagement.dto.response.ApiResponse;
import com.uniquehire.rolemanagement.dto.response.DepartmentResponse;
import com.uniquehire.rolemanagement.entity.Department;
import com.uniquehire.rolemanagement.enums.DepartmentName;
import com.uniquehire.rolemanagement.exception.DepartmentAlreadyExistsException;
import com.uniquehire.rolemanagement.exception.DepartmentNotFoundException;
import com.uniquehire.rolemanagement.repository.DepartmentRepository;
import com.uniquehire.rolemanagement.service.DepartmentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DepartmentServiceImpl implements DepartmentService {

    private static final Logger log = LoggerFactory.getLogger(DepartmentServiceImpl.class);

    private final DepartmentRepository departmentRepository;

    public DepartmentServiceImpl(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    @Override
    public ApiResponse<DepartmentResponse> addDepartment(DepartmentRequest request) {
        log.info("Attempting to create department with name: {}", request.getDepartmentName());

        if (departmentRepository.existsByDepartmentName(request.getDepartmentName())) {
            log.warn("Department already exists with name: {}", request.getDepartmentName());
            throw new DepartmentAlreadyExistsException(
                    "Department already exists with name: " + request.getDepartmentName()
            );
        }

        Department department = new Department();
        department.setDepartmentName(request.getDepartmentName());
        department.setNumberOfTrainingsGoingOn(request.getNumberOfTrainingsGoingOn());
        department.setDescription(request.getDescription());

        Department savedDepartment = departmentRepository.save(department);

        log.info("Department created successfully with id: {}", savedDepartment.getId());

        DepartmentResponse response = mapToResponse(savedDepartment);
        return new ApiResponse<>(true, "Department created successfully", response);
    }

    @Override
    public ApiResponse<DepartmentResponse> updateDepartment(Long id, DepartmentRequest request) {
        log.info("Attempting to update department with id: {}", id);

        Department existingDepartment = departmentRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Department not found with id: {}", id);
                    return new DepartmentNotFoundException("Department not found with id: " + id);
                });

        if (!existingDepartment.getDepartmentName().equals(request.getDepartmentName())
                && departmentRepository.existsByDepartmentName(request.getDepartmentName())) {
            log.warn("Another department already exists with name: {}", request.getDepartmentName());
            throw new DepartmentAlreadyExistsException(
                    "Department already exists with name: " + request.getDepartmentName()
            );
        }

        existingDepartment.setDepartmentName(request.getDepartmentName());
        existingDepartment.setNumberOfTrainingsGoingOn(request.getNumberOfTrainingsGoingOn());
        existingDepartment.setDescription(request.getDescription());

        Department updatedDepartment = departmentRepository.save(existingDepartment);

        log.info("Department updated successfully with id: {}", updatedDepartment.getId());

        DepartmentResponse response = mapToResponse(updatedDepartment);
        return new ApiResponse<>(true, "Department updated successfully", response);
    }

    @Override
    public ApiResponse<Map<String, Object>> getAllDepartments(int page, int size) {
        log.info("Fetching all departments with page: {} and size: {}", page, size);

        Pageable pageable = PageRequest.of(page, size);
        Page<Department> departmentPage = departmentRepository.findAll(pageable);

        List<DepartmentResponse> departmentResponseList = new ArrayList<>();
        for (Department department : departmentPage.getContent()) {
            departmentResponseList.add(mapToResponse(department));
        }

        Map<String, Object> pageData = new HashMap<>();
        pageData.put("content", departmentResponseList);
        pageData.put("pageNumber", departmentPage.getNumber());
        pageData.put("pageSize", departmentPage.getSize());
        pageData.put("totalElements", departmentPage.getTotalElements());
        pageData.put("totalPages", departmentPage.getTotalPages());
        pageData.put("last", departmentPage.isLast());

        log.info("Departments fetched successfully");

        return new ApiResponse<>(true, "Departments fetched successfully", pageData);
    }

    @Override
    public ApiResponse<DepartmentResponse> getDepartmentById(Long id) {
        log.info("Fetching department by id: {}", id);

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Department not found with id: {}", id);
                    return new DepartmentNotFoundException("Department not found with id: " + id);
                });

        DepartmentResponse response = mapToResponse(department);
        return new ApiResponse<>(true, "Department fetched successfully", response);
    }

    @Override
    public ApiResponse<DepartmentResponse> getDepartmentByName(DepartmentName departmentName) {
        log.info("Fetching department by name: {}", departmentName);

        Department department = departmentRepository.findByDepartmentName(departmentName)
                .orElseThrow(() -> {
                    log.warn("Department not found with name: {}", departmentName);
                    return new DepartmentNotFoundException("Department not found with name: " + departmentName);
                });

        DepartmentResponse response = mapToResponse(department);
        return new ApiResponse<>(true, "Department fetched successfully", response);
    }

    @Override
    public ApiResponse<String> deleteDepartment(Long id) {
        log.info("Attempting to delete department with id: {}", id);

        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Department not found with id: {}", id);
                    return new DepartmentNotFoundException("Department not found with id: " + id);
                });

        departmentRepository.delete(department);

        log.info("Department deleted successfully with id: {}", id);

        return new ApiResponse<>(
                true,
                "Department deleted successfully",
                "Department with id " + id + " deleted successfully"
        );
    }

    private DepartmentResponse mapToResponse(Department department) {
        DepartmentResponse response = new DepartmentResponse();
        response.setId(department.getId());
        response.setDepartmentName(department.getDepartmentName());
        response.setNumberOfTrainingsGoingOn(department.getNumberOfTrainingsGoingOn());
        response.setDescription(department.getDescription());
        return response;
    }
}