package com.ingtech.repository;

import com.ingtech.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * @author saad shahid
 *
 */
/* this the user Repository interface */
@CrossOrigin
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findOneByUsername(String username);

    // Optional<User> findOne(Long id);
}
