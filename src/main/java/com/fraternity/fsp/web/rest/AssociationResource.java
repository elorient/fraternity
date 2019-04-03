package com.fraternity.fsp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fraternity.fsp.domain.Association;
import com.fraternity.fsp.repository.AssociationRepository;
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
 * REST controller for managing Association.
 */
@RestController
@RequestMapping("/api")
public class AssociationResource {

    private final Logger log = LoggerFactory.getLogger(AssociationResource.class);

    private static final String ENTITY_NAME = "association";

    private final AssociationRepository associationRepository;

    public AssociationResource(AssociationRepository associationRepository) {
        this.associationRepository = associationRepository;
    }

    /**
     * POST  /associations : Create a new association.
     *
     * @param association the association to create
     * @return the ResponseEntity with status 201 (Created) and with body the new association, or with status 400 (Bad Request) if the association has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/associations")
    @Timed
    public ResponseEntity<Association> createAssociation(@RequestBody Association association) throws URISyntaxException {
        log.debug("REST request to save Association : {}", association);
        if (association.getId() != null) {
            throw new BadRequestAlertException("A new association cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Association result = associationRepository.save(association);
        return ResponseEntity.created(new URI("/api/associations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /associations : Updates an existing association.
     *
     * @param association the association to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated association,
     * or with status 400 (Bad Request) if the association is not valid,
     * or with status 500 (Internal Server Error) if the association couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/associations")
    @Timed
    public ResponseEntity<Association> updateAssociation(@RequestBody Association association) throws URISyntaxException {
        log.debug("REST request to update Association : {}", association);
        if (association.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Association result = associationRepository.save(association);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, association.getId().toString()))
            .body(result);
    }

    /**
     * GET  /associations : get all the associations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of associations in body
     */
    @GetMapping("/associations")
    @Timed
    public List<Association> getAllAssociations() {
        log.debug("REST request to get all Associations");
        return associationRepository.findAll();
    }

    /**
     * GET  /associations/:id : get the "id" association.
     *
     * @param id the id of the association to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the association, or with status 404 (Not Found)
     */
    @GetMapping("/associations/{id}")
    @Timed
    public ResponseEntity<Association> getAssociation(@PathVariable Long id) {
        log.debug("REST request to get Association : {}", id);
        Optional<Association> association = associationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(association);
    }

    /**
     * DELETE  /associations/:id : delete the "id" association.
     *
     * @param id the id of the association to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/associations/{id}")
    @Timed
    public ResponseEntity<Void> deleteAssociation(@PathVariable Long id) {
        log.debug("REST request to delete Association : {}", id);

        associationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
