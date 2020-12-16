package com.ingtech.repository;

import com.ingtech.model.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/*
    The role category repository, contains all curd methods. *These methods are also exposed*. You can see all exposed api's to Hal browser
    For example:  /accounttype  will return all clients. And /accounttype/{id} will return one role category.
 */
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "account_type", path = "accounttype")
public interface AccountTypeRepository extends JpaRepository<AccountType, Long> {

    /**
     * Delete exposing false, No user can delete accountType from Hal Browser
     *
     * @param accountType
     */
    @Override
    @RestResource(exported = false)
    void delete(AccountType accountType);

    @Override
    @RestResource(exported = false)
    void deleteAll();

}