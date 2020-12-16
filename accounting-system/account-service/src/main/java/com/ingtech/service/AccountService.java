package com.ingtech.service;

import com.ingtech.model.Account;
import com.ingtech.model.User;
import com.ingtech.model.UserAccount;
import com.ingtech.repository.AccountRepository;
import com.ingtech.repository.UserAccountRepository;
import com.ingtech.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author saad shahid
 *
 */
@Service
public class AccountService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserAccountRepository userAccountRepository;

    @Autowired
    AccountRepository accountRepository;

    public Account saveUserAccount(Account newAccount, String username) {

        Account account = accountRepository.saveAndFlush(newAccount);
        User user = userRepository.findOneByUsername(username);

        UserAccount userAccount = UserAccount.builder().account(account).user(user).build();

        userAccountRepository.saveAndFlush(userAccount);

        return null;
    }

    /*public boolean canCreateSavingAccount(String username) {
        List<Account> list = accountRepository.getAllSavingAccount(username);
        return list.size()>0?false:true;
    }*/

}
