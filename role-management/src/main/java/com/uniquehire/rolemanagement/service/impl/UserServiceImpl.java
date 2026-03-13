package com.uniquehire.rolemanagement.service.impl;

import com.uniquehire.rolemanagement.dto.request.UserRequestDTO;
import com.uniquehire.rolemanagement.dto.response.UserResponseDTO;
import com.uniquehire.rolemanagement.entity.Organization;
import com.uniquehire.rolemanagement.entity.Role;
import com.uniquehire.rolemanagement.entity.User;
import com.uniquehire.rolemanagement.exception.UserAlreadyExistsException;
import com.uniquehire.rolemanagement.exception.UserNotFoundException;
import com.uniquehire.rolemanagement.repository.OrganizationRepository;
import com.uniquehire.rolemanagement.repository.RoleRepository;
import com.uniquehire.rolemanagement.repository.UserRepository;
import com.uniquehire.rolemanagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final OrganizationRepository organizationRepository;

    @Override
    public UserResponseDTO registerUser(UserRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        if (userRepository.existsByOrganization_OrgId(request.getOrganizationId())) {
            throw new UserAlreadyExistsException("Organization already assigned to another user");
        }

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Organization organization = organizationRepository.findById(request.getOrganizationId())
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        User user = User.builder()
                .username(request.getUsername())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(role)
                .organization(organization)
                .build();

        User savedUser = userRepository.save(user);

        return mapToResponse(savedUser);
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponseDTO getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return mapToResponse(user);
    }

    @Override
    public UserResponseDTO updateUser(Long id, UserRequestDTO request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (!user.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email already exists");
        }

        if (!user.getUsername().equals(request.getUsername())
                && userRepository.existsByUsername(request.getUsername())) {
            throw new UserAlreadyExistsException("Username already exists");
        }

        if (!user.getOrganization().getOrgId().equals(request.getOrganizationId())
                && userRepository.existsByOrganization_OrgId(request.getOrganizationId())) {
            throw new UserAlreadyExistsException("Organization already assigned");
        }

        Role role = roleRepository.findById(request.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        Organization organization = organizationRepository.findById(request.getOrganizationId())
                .orElseThrow(() -> new RuntimeException("Organization not found"));

        user.setUsername(request.getUsername());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(role);
        user.setOrganization(organization);

        User updatedUser = userRepository.save(user);

        return mapToResponse(updatedUser);
    }

    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        userRepository.delete(user);
    }

    private UserResponseDTO mapToResponse(User user) {

        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .status(user.getStatus())
                .createdAt(user.getCreatedAt())
                .roleId(user.getRole().getRoleId())
                .roleName(user.getRole().getRoleName())
                .organizationId(user.getOrganization().getOrgId())
                .organizationName(user.getOrganization().getOrgName())
                .build();
    }
}