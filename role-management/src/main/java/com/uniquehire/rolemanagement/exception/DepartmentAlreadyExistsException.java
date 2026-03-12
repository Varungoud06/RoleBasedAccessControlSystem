package com.uniquehire.rolemanagement.exception;


public class DepartmentAlreadyExistsException extends RuntimeException {

    public DepartmentAlreadyExistsException(String message) {
        super(message);
    }
}