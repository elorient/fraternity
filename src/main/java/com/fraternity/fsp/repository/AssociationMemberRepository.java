package com.fraternity.fsp.repository;

import com.fraternity.fsp.domain.AssociationMember;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AssociationMember entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssociationMemberRepository extends JpaRepository<AssociationMember, Long> {

}
