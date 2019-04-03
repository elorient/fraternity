package com.fraternity.fsp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Association.
 */
@Entity
@Table(name = "association")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Association implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "n_siret")
    private String nSiret;

    @Column(name = "statut")
    private String statut;

    @ManyToOne
    @JsonIgnoreProperties("")
    private AssociationMember asso;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getnSiret() {
        return nSiret;
    }

    public Association nSiret(String nSiret) {
        this.nSiret = nSiret;
        return this;
    }

    public void setnSiret(String nSiret) {
        this.nSiret = nSiret;
    }

    public String getStatut() {
        return statut;
    }

    public Association statut(String statut) {
        this.statut = statut;
        return this;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public AssociationMember getAsso() {
        return asso;
    }

    public Association asso(AssociationMember associationMember) {
        this.asso = associationMember;
        return this;
    }

    public void setAsso(AssociationMember associationMember) {
        this.asso = associationMember;
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
        Association association = (Association) o;
        if (association.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), association.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Association{" +
            "id=" + getId() +
            ", nSiret='" + getnSiret() + "'" +
            ", statut='" + getStatut() + "'" +
            "}";
    }
}
