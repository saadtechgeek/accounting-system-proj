package com.ingtech.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "ACCOUNT_TYPE")
public class AccountType extends BaseDefinitionEntity implements Serializable {

    public static final long serialVersionUID = -3317842467601113405L;
    @Fetch(FetchMode.JOIN)
    @JsonManagedReference
    @OneToMany(mappedBy = "accountType", fetch = FetchType.EAGER)
    List<Account> account;

    public AccountType(String name) {
        super(name);
    }

    public AccountType() {

    }

}
