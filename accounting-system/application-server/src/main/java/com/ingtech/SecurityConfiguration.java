package com.ingtech;

import com.ingtech.service.AppUserDetailsService;
import com.ingtech.utils.EncryptionUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * @author Saad Shahid
 *
 */
@EnableWebSecurity
@EnableJpaRepositories(basePackageClasses = AccountManagementApplication.class)
@Configuration
// Modifying or overriding the default spring boot security.
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    AppUserDetailsService appUserDetailsService;

    // This method is for overriding the default AuthenticationManagerBuilder.
    // We can specify how the user details are kept in the application. It may
    // be in a database, LDAP or in memory.
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(appUserDetailsService).passwordEncoder(getPasswordEncoder());

    }

    // this configuration allow the client app to access the this api
    // all the domain that consume this api must be included in the allowed o'rings
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:5200");
            }
        };
    }

    // This method is used for override HttpSecurity of the web Application.
    // We can specify our authorization criteria inside this method.
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and()
                // starts authorizing configurations
                .authorizeRequests()
                // ignoring the guest's urls "accountmanagement/users
                .antMatchers("/account/validateSavingAccount", "/accountmanagement/accounts/search/savingaccount",
                        "/account/save", "/accountmanagement/accounttype", "/users", "/accountmanagement/users",
                        "/user/register", "/user/login", "/logout")
                .permitAll()
                // authenticate all remaining URLS
                .anyRequest().fullyAuthenticated().and()
                /*
                 * "/logout" will log the user out by invalidating the HTTP Session, cleaning up any {link rememberMe()}
                 * authentication that was configured,
                 */
                .logout().permitAll().logoutRequestMatcher(new AntPathRequestMatcher("/logout", "POST")).and()
                // enabling the basic authentication
                .httpBasic().and()
                // configuring the session on the server
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED).and()
                // disabling the CSRF - Cross Site Request Forgery
                .csrf().disable();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**", "/js/**");
    }

    @NotNull
    private PasswordEncoder getPasswordEncoder() {
        return new PasswordEncoder() {
            @Override
            public String encode(CharSequence charSequence) {
                return EncryptionUtils.encrypt(charSequence.toString());
            }

            @Override
            public boolean matches(CharSequence userInputCharSequence, String myOriginalEncryptedPassword) {
                return EncryptionUtils.encrypt(userInputCharSequence.toString()).equals(myOriginalEncryptedPassword);
            }
        };
    }
}
