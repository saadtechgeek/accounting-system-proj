package com.ingtech.repository;

import com.ingtech.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

/*
    The client permission repository, contains all curd methods. *These methods are also exposed*. You can see all exposed api's to Hal browser
    For example:  /useraccount will return all clients. And /useraccount/{id} will return one user account.
 */
@RepositoryRestResource(collectionResourceRel = "useraccount", path = "useraccount")
public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    /**
     * Delete exposing false, No user can delete client permission from Hal Browser
     *
     * @param userAccount
     */
    @Override
    @RestResource(exported = false)
    void delete(UserAccount userAccount);

    @Override
    @RestResource(exported = false)
    void deleteAll();

}
