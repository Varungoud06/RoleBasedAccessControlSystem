package com.uniquehire.rolemanagement.service.impl;

import com.uniquehire.rolemanagement.dto.request.RoleRequest;
import com.uniquehire.rolemanagement.dto.response.ApiResponse;
import com.uniquehire.rolemanagement.dto.response.RoleResponse;
import com.uniquehire.rolemanagement.entity.Role;
import com.uniquehire.rolemanagement.enums.MessageEnum;
import com.uniquehire.rolemanagement.enums.Status;
import com.uniquehire.rolemanagement.repository.RoleRepository;
import com.uniquehire.rolemanagement.service.RoleService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    /**
     * CREATE ROLE
     */
    @Override
    public ResponseEntity<ApiResponse<RoleResponse>> createRole(RoleRequest request) {

        Role role = Role.builder()
                .roleName(request.getRoleName())
                .description(request.getDescription())
                .status(request.getStatus() != null ? request.getStatus() : Status.ACTIVE)
                .createdBy(request.getCreatedBy())
                .createdAt(LocalDateTime.now())
                .build();

        Role savedRole = roleRepository.save(role);

        ApiResponse<RoleResponse> response = ApiResponse.<RoleResponse>builder()
                .success(true)
                .message(MessageEnum.ROLE_CREATED.getMessage())
                .data(map(savedRole))
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET ROLE BY ID
     */
    @Override
    public ResponseEntity<ApiResponse<RoleResponse>> getRoleById(Long roleId) {

        Role role = roleRepository.findById(roleId).orElse(null);

        if (role == null) {

            ApiResponse<RoleResponse> response = ApiResponse.<RoleResponse>builder()
                    .success(false)
                    .message(MessageEnum.ROLE_NOT_FOUND.getMessage())
                    .data(null)
                    .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        ApiResponse<RoleResponse> response = ApiResponse.<RoleResponse>builder()
                .success(true)
                .message(MessageEnum.ROLE_FETCHED.getMessage())
                .data(map(role))
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * UPDATE ROLE
     */
    @Override
    public ResponseEntity<ApiResponse<RoleResponse>> updateRole(Long roleId, RoleRequest request) {

        Role role = roleRepository.findById(roleId).orElse(null);

        if (role == null) {

            ApiResponse<RoleResponse> response = ApiResponse.<RoleResponse>builder()
                    .success(false)
                    .message(MessageEnum.ROLE_NOT_FOUND.getMessage())
                    .data(null)
                    .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        role.setRoleName(request.getRoleName());
        role.setDescription(request.getDescription());
        role.setStatus(request.getStatus());
        role.setUpdatedBy(request.getUpdatedBy());
        role.setUpdatedAt(LocalDateTime.now());

        Role updatedRole = roleRepository.save(role);

        ApiResponse<RoleResponse> response = ApiResponse.<RoleResponse>builder()
                .success(true)
                .message(MessageEnum.ROLE_UPDATED.getMessage())
                .data(map(updatedRole))
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * DELETE ROLE (SOFT DELETE)
     */
    @Override
    public ResponseEntity<ApiResponse<String>> deleteRole(Long roleId) {

        Role role = roleRepository.findById(roleId).orElse(null);

        if (role == null) {

            ApiResponse<String> response = ApiResponse.<String>builder()
                    .success(false)
                    .message(MessageEnum.ROLE_NOT_FOUND.getMessage())
                    .data(null)
                    .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }

        role.setStatus(Status.DELETED);
        role.setUpdatedAt(LocalDateTime.now());

        roleRepository.save(role);

        ApiResponse<String> response = ApiResponse.<String>builder()
                .success(true)
                .message(MessageEnum.ROLE_DELETED.getMessage())
                .data("Deleted")
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET ALL ROLES
     */
    @Override
    public ResponseEntity<ApiResponse<List<RoleResponse>>> getAllRoles() {

        List<RoleResponse> roles = roleRepository.findAll()
                .stream()
                .map(this::map)
                .collect(Collectors.toList());

        ApiResponse<List<RoleResponse>> response = ApiResponse.<List<RoleResponse>>builder()
                .success(true)
                .message(MessageEnum.ROLES_FETCHED.getMessage())
                .data(roles)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * PAGINATION
     */
    @Override
    public ResponseEntity<ApiResponse<Page<RoleResponse>>> getRolesWithPagination(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<RoleResponse> roles = roleRepository.findAll(pageable)
                .map(this::map);

        ApiResponse<Page<RoleResponse>> response = ApiResponse.<Page<RoleResponse>>builder()
                .success(true)
                .message(MessageEnum.ROLES_FETCHED.getMessage())
                .data(roles)
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * ENTITY → RESPONSE DTO
     */
    private RoleResponse map(Role role) {

        return RoleResponse.builder()
                .roleId(role.getRoleId())
                .roleName(role.getRoleName())
                .description(role.getDescription())
                .status(role.getStatus())
                .build();
    }
}