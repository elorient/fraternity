package com.fraternity.fsp.repository;

import com.fraternity.fsp.domain.HelpAction;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the HelpAction entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HelpActionRepository extends JpaRepository<HelpAction, Long> {

    @Query("select help_action from HelpAction help_action where help_action.to.login = ?#{principal.username}")
    List<HelpAction> findByToIsCurrentUser();

    @Query("select help_action from HelpAction help_action where help_action.from.login = ?#{principal.username}")
    List<HelpAction> findByFromIsCurrentUser();

}
