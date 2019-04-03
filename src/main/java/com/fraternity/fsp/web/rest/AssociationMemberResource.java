package com.fraternity.fsp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fraternity.fsp.domain.AssociationMember;
import com.fraternity.fsp.repository.AssociationMemberRepository;
import com.fraternity.fsp.web.rest.errors.BadRequestAlertException;
import com.fraternity.fsp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AssociationMember.
 */
@RestController
@RequestMapping("/api")
public class AssociationMemberResource {

    private final Logger log = LoggerFactory.getLogger(AssociationMemberResource.class);

    private static final String ENTITY_NAME = "associationMember";

    private final AssociationMemberRepository associationMemberRepository;

    public AssociationMemberResource(AssociationMemberRepository associationMemberRepository) {
        this.associationMemberRepository = associationMemberRepository;
    }

    /**
     * POST  /association-members : Create a new associationMember.
     *
     * @param associationMember the associationMember to create
     * @return the ResponseEntity with status 201 (Created) and with body the new associationMember, or with status 400 (Bad Request) if the associationMember has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/association-members")
    @Timed
    public ResponseEntity<AssociationMember> createAssociationMember(@RequestBody AssociationMember associationMember) throws URISyntaxException {
        log.debug("REST request to save AssociationMember : {}", associationMember);
        if (associationMember.getId() != null) {
            throw new BadRequestAlertException("A new associationMember cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AssociationMember result = associationMemberRepository.save(associationMember);
        return ResponseEntity.created(new URI("/api/association-members/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /association-members : Updates an existing associationMember.
     *
     * @param associationMember the associationMember to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated associationMember,
     * or with status 400 (Bad Request) if the associationMember is not valid,
     * or with status 500 (Internal Server Error) if the associationMember couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/association-members")
    @Timed
    public ResponseEntity<AssociationMember> updateAssociationMember(@RequestBody AssociationMember associationMember) throws URISyntaxException {
        log.debug("REST request to update AssociationMember : {}", associationMember);
        if (associationMember.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AssociationMember result = associationMemberRepository.save(associationMember);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, associationMember.getId().toString()))
            .body(result);
    }

    /**
     * GET  /association-members : get all the associationMembers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of associationMembers in body
     */
    @GetMapping("/association-members")
    @Timed
    public List<AssociationMember> getAllAssociationMembers() {
        log.debug("REST request to get all AssociationMembers");
        return associationMemberRepository.findAll();
    }

    /**
     * GET  /association-members/:id : get the "id" associationMember.
     *
     * @param id the id of the associationMember to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the associationMember, or with status 404 (Not Found)
     */
    @GetMapping("/association-members/{id}")
    @Timed
    public ResponseEntity<AssociationMember> getAssociationMember(@PathVariable Long id) {
        log.debug("REST request to get AssociationMember : {}", id);
        Optional<AssociationMember> associationMember = associationMemberRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(associationMember);
    }

    /**
     * DELETE  /association-members/:id : delete the "id" associationMember.
     *
     * @param id the id of the associationMember to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/association-members/{id}")
    @Timed
    public ResponseEntity<Void> deleteAssociationMember(@PathVariable Long id) {
        log.debug("REST request to delete AssociationMember : {}", id);

        associationMemberRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
