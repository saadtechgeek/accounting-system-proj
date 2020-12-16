package com.ingtech.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Data;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Description of Account.
 *
 * @author saad shahid
 */
@Entity
@Table(name = "Account")
@Data
@Builder

@NamedNativeQueries(value = { @NamedNativeQuery(name = Account.SAVING_ACCOUNT_QUERY, query = "SELECT A.* FROM ACCOUNT A "
        + "INNER JOIN USER_ACCOUNT AC ON AC.ACCOUNTID=A.ID "
        + "INNER JOIN ACCOUNT_TYPE AT ON AT.ID = A.ACCOUNTTYPEID INNER JOIN USER U ON U.ID = AC.USERID "
        + "WHERE LOWER(AT.NAME)='saving' AND U.username=:username",resultClass = Account.class
        )})
public class Account implements Serializable {

    public static final long serialVersionUID = 6757952379885483790L;


    public static final String SAVING_ACCOUNT_QUERY = "getSavingAccount";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic
    @Column(unique = true, name = "ACCOUNTNUMBER")
    private String accountNumber;

    @Basic
    @Column(name = "TITLE")
    private String title;

    @Basic
    @Column(name = "FIRSTNAME")
    private String firstName;

    @Basic
    @Column(name = "LASTNAME")
    private String lastName;

    @Basic
    @Column(name = "GENDER")
    private String gender;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinColumn(name = "ACCOUNTTYPEID")
    private AccountType accountType;

    @Basic
    @Column(name = "CRTD_BY")
    private String crtdBy;

    @Basic
    @Column(name = "CRTD_DATE")
    private LocalDateTime crtdDate;

    @PrePersist
    protected void populateFields() {
        crtdBy = "Saad Shahid";
        crtdDate = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object o) {
        return EqualsBuilder.reflectionEquals(this, o);
    }

    @Override
    public int hashCode() {
        return Objects.hash(accountNumber);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}

