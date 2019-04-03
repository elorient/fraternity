package com.fraternity.fsp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AssociationMember.
 */
@Entity
@Table(name = "association_member")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AssociationMember implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "is_president")
    private Boolean isPresident;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsPresident() {
        return isPresident;
    }

    public AssociationMember isPresident(Boolean isPresident) {
        this.isPresident = isPresident;
        return this;
    }

    public void setIsPresident(Boolean isPresident) {
        this.isPresident = isPresident;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AssociationMember associationMember = (AssociationMember) o;
        if (associationMember.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), associationMember.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AssociationMember{" +
            "id=" + getId() +
            ", isPresident='" + isIsPresident() + "'" +
            "}";
    }
}
