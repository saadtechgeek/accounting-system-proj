package com.ingtech;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 *
 * @author sshahid
 *
 */
@SpringBootApplication(scanBasePackageClasses = { AccountManagementApplication.class })
@EntityScan(basePackageClasses = { AccountManagementApplication.class })
@EnableJpaRepositories(basePackageClasses = { AccountManagementApplication.class })

// Enables stuff like EntityManagerFactoryBuilder to be created for us.
public class AccountManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(AccountManagementApplication.class, args);
    }
}
