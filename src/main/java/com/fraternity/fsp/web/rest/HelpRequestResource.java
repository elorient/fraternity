package com.fraternity.fsp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fraternity.fsp.domain.HelpRequest;
import com.fraternity.fsp.repository.HelpRequestRepository;
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
 * REST controller for managing HelpRequest.
 */
@RestController
@RequestMapping("/api")
public class HelpRequestResource {

    private final Logger log = LoggerFactory.getLogger(HelpRequestResource.class);

    private static final String ENTITY_NAME = "helpRequest";

    private final HelpRequestRepository helpRequestRepository;

    public HelpRequestResource(HelpRequestRepository helpRequestRepository) {
        this.helpRequestRepository = helpRequestRepository;
    }

    /**
     * POST  /help-requests : Create a new helpRequest.
     *
     * @param helpRequest the helpRequest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new helpRequest, or with status 400 (Bad Request) if the helpRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/help-requests")
    @Timed
    public ResponseEntity<HelpRequest> createHelpRequest(@RequestBody HelpRequest helpRequest) throws URISyntaxException {
        log.debug("REST request to save HelpRequest : {}", helpRequest);
        if (helpRequest.getId() != null) {
            throw new BadRequestAlertException("A new helpRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HelpRequest result = helpRequestRepository.save(helpRequest);
        return ResponseEntity.created(new URI("/api/help-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /help-requests : Updates an existing helpRequest.
     *
     * @param helpRequest the helpRequest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated helpRequest,
     * or with status 400 (Bad Request) if the helpRequest is not valid,
     * or with status 500 (Internal Server Error) if the helpRequest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/help-requests")
    @Timed
    public ResponseEntity<HelpRequest> updateHelpRequest(@RequestBody HelpRequest helpRequest) throws URISyntaxException {
        log.debug("REST request to update HelpRequest : {}", helpRequest);
        if (helpRequest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HelpRequest result = helpRequestRepository.save(helpRequest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, helpRequest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /help-requests : get all the helpRequests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of helpRequests in body
     */
    @GetMapping("/help-requests")
    @Timed
    public List<HelpRequest> getAllHelpRequests() {
        log.debug("REST request to get all HelpRequests");
        return helpRequestRepository.findAll();
    }

    /**
     * GET  /help-requests/:id : get the "id" helpRequest.
     *
     * @param id the id of the helpRequest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the helpRequest, or with status 404 (Not Found)
     */
    @GetMapping("/help-requests/{id}")
    @Timed
    public ResponseEntity<HelpRequest> getHelpRequest(@PathVariable Long id) {
        log.debug("REST request to get HelpRequest : {}", id);
        Optional<HelpRequest> helpRequest = helpRequestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(helpRequest);
    }

    /**
     * DELETE  /help-requests/:id : delete the "id" helpRequest.
     *
     * @param id the id of the helpRequest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/help-requests/{id}")
    @Timed
    public ResponseEntity<Void> deleteHelpRequest(@PathVariable Long id) {
        log.debug("REST request to delete HelpRequest : {}", id);

        helpRequestRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
