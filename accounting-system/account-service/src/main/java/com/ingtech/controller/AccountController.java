package com.ingtech.controller;

import com.ingtech.model.Account;
import com.ingtech.service.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * /**
 *
 * @author saad shahid
 *
 */
@RestController
@BasePathAwareController
@RequestMapping({ "/account" })
public class AccountController {

    public static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    AccountService accountService;

    /**
     * Create new account against user
     * 
     * @param account
     * @return
     */
    @PostMapping(value = "/save")
    public Account createAccount(@RequestBody Account account, HttpServletRequest request,
            HttpServletResponse response) {

        return accountService.saveUserAccount(account, request.getParameter("username"));
    }
}
