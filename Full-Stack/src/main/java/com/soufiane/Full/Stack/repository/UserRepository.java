package com.soufiane.Full.Stack.repository;

import com.soufiane.Full.Stack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
