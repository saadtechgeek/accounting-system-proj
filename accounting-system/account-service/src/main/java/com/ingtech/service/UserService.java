package com.ingtech.service;

import com.ingtech.model.User;
import com.ingtech.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author saad shahid
 *
 */
@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User save(User user) {
        return userRepository.saveAndFlush(user);
    }

    public User update(User user) {
        return userRepository.save(user);
    }

    public User find(String userName) {
        return userRepository.findOneByUsername(userName);
    }

    /*
     * public Optional<User> find(Long id) { // return userRepository.findOne(id); Optional<User> optionalUser =
     * userRepository.findOne(id);
     * 
     * optionalUser.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
     * 
     * return optionalUser;
     * 
     * }
     */

}
