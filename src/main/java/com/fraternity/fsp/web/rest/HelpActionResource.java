package com.fraternity.fsp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fraternity.fsp.domain.HelpAction;
import com.fraternity.fsp.repository.HelpActionRepository;
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
 * REST controller for managing HelpAction.
 */
@RestController
@RequestMapping("/api")
public class HelpActionResource {

    private final Logger log = LoggerFactory.getLogger(HelpActionResource.class);

    private static final String ENTITY_NAME = "helpAction";

    private final HelpActionRepository helpActionRepository;

    public HelpActionResource(HelpActionRepository helpActionRepository) {
        this.helpActionRepository = helpActionRepository;
    }

    /**
     * POST  /help-actions : Create a new helpAction.
     *
     * @param helpAction the helpAction to create
     * @return the ResponseEntity with status 201 (Created) and with body the new helpAction, or with status 400 (Bad Request) if the helpAction has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/help-actions")
    @Timed
    public ResponseEntity<HelpAction> createHelpAction(@RequestBody HelpAction helpAction) throws URISyntaxException {
        log.debug("REST request to save HelpAction : {}", helpAction);
        if (helpAction.getId() != null) {
            throw new BadRequestAlertException("A new helpAction cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HelpAction result = helpActionRepository.save(helpAction);
        return ResponseEntity.created(new URI("/api/help-actions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /help-actions : Updates an existing helpAction.
     *
     * @param helpAction the helpAction to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated helpAction,
     * or with status 400 (Bad Request) if the helpAction is not valid,
     * or with status 500 (Internal Server Error) if the helpAction couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/help-actions")
    @Timed
    public ResponseEntity<HelpAction> updateHelpAction(@RequestBody HelpAction helpAction) throws URISyntaxException {
        log.debug("REST request to update HelpAction : {}", helpAction);
        if (helpAction.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HelpAction result = helpActionRepository.save(helpAction);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, helpAction.getId().toString()))
            .body(result);
    }

    /**
     * GET  /help-actions : get all the helpActions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of helpActions in body
     */
    @GetMapping("/help-actions")
    @Timed
    public List<HelpAction> getAllHelpActions() {
        log.debug("REST request to get all HelpActions");
        return helpActionRepository.findAll();
    }

    /**
     * GET  /help-actions/:id : get the "id" helpAction.
     *
     * @param id the id of the helpAction to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the helpAction, or with status 404 (Not Found)
     */
    @GetMapping("/help-actions/{id}")
    @Timed
    public ResponseEntity<HelpAction> getHelpAction(@PathVariable Long id) {
        log.debug("REST request to get HelpAction : {}", id);
        Optional<HelpAction> helpAction = helpActionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(helpAction);
    }

    /**
     * DELETE  /help-actions/:id : delete the "id" helpAction.
     *
     * @param id the id of the helpAction to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/help-actions/{id}")
    @Timed
    public ResponseEntity<Void> deleteHelpAction(@PathVariable Long id) {
        log.debug("REST request to delete HelpAction : {}", id);

        helpActionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
