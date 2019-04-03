package com.fraternity.fsp.repository;

import com.fraternity.fsp.domain.HelpRequest;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the HelpRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HelpRequestRepository extends JpaRepository<HelpRequest, Long> {

    @Query("select help_request from HelpRequest help_request where help_request.request.login = ?#{principal.username}")
    List<HelpRequest> findByRequestIsCurrentUser();

}
