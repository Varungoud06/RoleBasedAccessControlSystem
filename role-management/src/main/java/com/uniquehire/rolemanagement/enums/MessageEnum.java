package com.uniquehire.rolemanagement.enums;

public enum MessageEnum {

    ROLE_CREATED("Role created successfully"),
    ROLE_UPDATED("Role updated successfully"),
    ROLE_FETCHED("Role fetched successfully"),
    ROLES_FETCHED("Roles fetched successfully"),
    ROLE_DELETED("Role deleted successfully"),
    ROLE_NOT_FOUND("Role not found");

    private final String message;

    MessageEnum(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}