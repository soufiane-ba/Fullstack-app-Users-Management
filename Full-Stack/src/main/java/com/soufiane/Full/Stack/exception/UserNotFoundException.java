package com.soufiane.Full.Stack.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(Long id){
        super("could not find the user with id "+id);
    }
}
