package com.uniquehire.rolemanagement.controller;


import com.uniquehire.rolemanagement.dto.request.RoleRequest;
import com.uniquehire.rolemanagement.dto.response.ApiResponse;
import com.uniquehire.rolemanagement.dto.response.RoleResponse;
import com.uniquehire.rolemanagement.service.RoleService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    /**
     * CREATE ROLE
     */
    @PostMapping
    public ResponseEntity<ApiResponse<RoleResponse>> createRole(
            @RequestBody RoleRequest request) {

        return roleService.createRole(request);
    }

    /**
     * GET ROLE BY ID
     */
    @GetMapping("/{roleId}")
    public ResponseEntity<ApiResponse<RoleResponse>> getRoleById(
            @PathVariable Long roleId) {

        return roleService.getRoleById(roleId);
    }

    /**
     * UPDATE ROLE
     */
    @PutMapping("/{roleId}")
    public ResponseEntity<ApiResponse<RoleResponse>> updateRole(
            @PathVariable Long roleId,
            @RequestBody RoleRequest request) {

        return roleService.updateRole(roleId, request);
    }

    /**
     * DELETE ROLE
     */
    @DeleteMapping("/{roleId}")
    public ResponseEntity<ApiResponse<String>> deleteRole(
            @PathVariable Long roleId) {

        return roleService.deleteRole(roleId);
    }

    /**
     * GET ALL ROLES
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<RoleResponse>>> getAllRoles() {

        return roleService.getAllRoles();
    }

    /**
     * PAGINATION
     */
    @GetMapping("/pagination")
    public ResponseEntity<ApiResponse<Page<RoleResponse>>> getRolesWithPagination(
            @RequestParam int page,
            @RequestParam int size) {

        return roleService.getRolesWithPagination(page, size);
    }
}