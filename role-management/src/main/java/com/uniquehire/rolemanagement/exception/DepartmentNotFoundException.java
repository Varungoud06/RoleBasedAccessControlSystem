package com.uniquehire.rolemanagement.exception;



public class DepartmentNotFoundException extends RuntimeException {

    public DepartmentNotFoundException(String message) {
        super(message);
    }
}