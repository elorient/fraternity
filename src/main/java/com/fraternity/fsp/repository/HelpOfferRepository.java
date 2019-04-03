package com.fraternity.fsp.repository;

import com.fraternity.fsp.domain.HelpOffer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the HelpOffer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HelpOfferRepository extends JpaRepository<HelpOffer, Long> {

    @Query("select help_offer from HelpOffer help_offer where help_offer.give.login = ?#{principal.username}")
    List<HelpOffer> findByGiveIsCurrentUser();

}
