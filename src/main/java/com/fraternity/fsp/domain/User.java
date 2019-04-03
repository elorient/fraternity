package com.fraternity.fsp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A User.
 */
@Entity
@Table(name = "user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HelpOffer> gives = new HashSet<>();
    @OneToMany(mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HelpRequest> requests = new HashSet<>();
    @OneToMany(mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HelpAction> tos = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<HelpOffer> getGives() {
        return gives;
    }

    public User gives(Set<HelpOffer> helpOffers) {
        this.gives = helpOffers;
        return this;
    }

    public User addGive(HelpOffer helpOffer) {
        this.gives.add(helpOffer);
        helpOffer.setUser(this);
        return this;
    }

    public User removeGive(HelpOffer helpOffer) {
        this.gives.remove(helpOffer);
        helpOffer.setUser(null);
        return this;
    }

    public void setGives(Set<HelpOffer> helpOffers) {
        this.gives = helpOffers;
    }

    public Set<HelpRequest> getRequests() {
        return requests;
    }

    public User requests(Set<HelpRequest> helpRequests) {
        this.requests = helpRequests;
        return this;
    }

    public User addRequest(HelpRequest helpRequest) {
        this.requests.add(helpRequest);
        helpRequest.setUser(this);
        return this;
    }

    public User removeRequest(HelpRequest helpRequest) {
        this.requests.remove(helpRequest);
        helpRequest.setUser(null);
        return this;
    }

    public void setRequests(Set<HelpRequest> helpRequests) {
        this.requests = helpRequests;
    }

    public Set<HelpAction> getTos() {
        return tos;
    }

    public User tos(Set<HelpAction> helpActions) {
        this.tos = helpActions;
        return this;
    }

    public User addTo(HelpAction helpAction) {
        this.tos.add(helpAction);
        helpAction.setUser(this);
        return this;
    }

    public User removeTo(HelpAction helpAction) {
        this.tos.remove(helpAction);
        helpAction.setUser(null);
        return this;
    }

    public void setTos(Set<HelpAction> helpActions) {
        this.tos = helpActions;
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
        User user = (User) o;
        if (user.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), user.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "User{" +
            "id=" + getId() +
            "}";
    }
}
