package com.uniquehire.rolemanagement.service;

import com.uniquehire.rolemanagement.dto.request.RoleRequest;
import com.uniquehire.rolemanagement.dto.response.ApiResponse;
import com.uniquehire.rolemanagement.dto.response.RoleResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RoleService {

    ResponseEntity<ApiResponse<RoleResponse>> createRole(RoleRequest request);

    ResponseEntity<ApiResponse<RoleResponse>> updateRole(Long roleId, RoleRequest request);

    ResponseEntity<ApiResponse<RoleResponse>> getRoleById(Long roleId);

    ResponseEntity<ApiResponse<String>> deleteRole(Long roleId);

    ResponseEntity<ApiResponse<List<RoleResponse>>> getAllRoles();

    ResponseEntity<ApiResponse<Page<RoleResponse>>> getRolesWithPagination(int page, int size);
}