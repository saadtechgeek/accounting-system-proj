package com.ingtech.repository;

import com.ingtech.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    @RestResource(path = "savingaccount")
    @Query(name = Account.SAVING_ACCOUNT_QUERY, nativeQuery = true)
    Optional<Object> getAllSavingAccount(@Param("username") String username);
}
