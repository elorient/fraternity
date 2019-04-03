package com.fraternity.fsp.web.rest;

import com.fraternity.fsp.FraternityApp;

import com.fraternity.fsp.domain.AssociationMember;
import com.fraternity.fsp.repository.AssociationMemberRepository;
import com.fraternity.fsp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.fraternity.fsp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AssociationMemberResource REST controller.
 *
 * @see AssociationMemberResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FraternityApp.class)
public class AssociationMemberResourceIntTest {

    private static final Boolean DEFAULT_IS_PRESIDENT = false;
    private static final Boolean UPDATED_IS_PRESIDENT = true;

    @Autowired
    private AssociationMemberRepository associationMemberRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restAssociationMemberMockMvc;

    private AssociationMember associationMember;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssociationMemberResource associationMemberResource = new AssociationMemberResource(associationMemberRepository);
        this.restAssociationMemberMockMvc = MockMvcBuilders.standaloneSetup(associationMemberResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AssociationMember createEntity(EntityManager em) {
        AssociationMember associationMember = new AssociationMember()
            .isPresident(DEFAULT_IS_PRESIDENT);
        return associationMember;
    }

    @Before
    public void initTest() {
        associationMember = createEntity(em);
    }

    @Test
    @Transactional
    public void createAssociationMember() throws Exception {
        int databaseSizeBeforeCreate = associationMemberRepository.findAll().size();

        // Create the AssociationMember
        restAssociationMemberMockMvc.perform(post("/api/association-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(associationMember)))
            .andExpect(status().isCreated());

        // Validate the AssociationMember in the database
        List<AssociationMember> associationMemberList = associationMemberRepository.findAll();
        assertThat(associationMemberList).hasSize(databaseSizeBeforeCreate + 1);
        AssociationMember testAssociationMember = associationMemberList.get(associationMemberList.size() - 1);
        assertThat(testAssociationMember.isIsPresident()).isEqualTo(DEFAULT_IS_PRESIDENT);
    }

    @Test
    @Transactional
    public void createAssociationMemberWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = associationMemberRepository.findAll().size();

        // Create the AssociationMember with an existing ID
        associationMember.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssociationMemberMockMvc.perform(post("/api/association-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(associationMember)))
            .andExpect(status().isBadRequest());

        // Validate the AssociationMember in the database
        List<AssociationMember> associationMemberList = associationMemberRepository.findAll();
        assertThat(associationMemberList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAssociationMembers() throws Exception {
        // Initialize the database
        associationMemberRepository.saveAndFlush(associationMember);

        // Get all the associationMemberList
        restAssociationMemberMockMvc.perform(get("/api/association-members?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(associationMember.getId().intValue())))
            .andExpect(jsonPath("$.[*].isPresident").value(hasItem(DEFAULT_IS_PRESIDENT.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getAssociationMember() throws Exception {
        // Initialize the database
        associationMemberRepository.saveAndFlush(associationMember);

        // Get the associationMember
        restAssociationMemberMockMvc.perform(get("/api/association-members/{id}", associationMember.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(associationMember.getId().intValue()))
            .andExpect(jsonPath("$.isPresident").value(DEFAULT_IS_PRESIDENT.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingAssociationMember() throws Exception {
        // Get the associationMember
        restAssociationMemberMockMvc.perform(get("/api/association-members/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAssociationMember() throws Exception {
        // Initialize the database
        associationMemberRepository.saveAndFlush(associationMember);

        int databaseSizeBeforeUpdate = associationMemberRepository.findAll().size();

        // Update the associationMember
        AssociationMember updatedAssociationMember = associationMemberRepository.findById(associationMember.getId()).get();
        // Disconnect from session so that the updates on updatedAssociationMember are not directly saved in db
        em.detach(updatedAssociationMember);
        updatedAssociationMember
            .isPresident(UPDATED_IS_PRESIDENT);

        restAssociationMemberMockMvc.perform(put("/api/association-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssociationMember)))
            .andExpect(status().isOk());

        // Validate the AssociationMember in the database
        List<AssociationMember> associationMemberList = associationMemberRepository.findAll();
        assertThat(associationMemberList).hasSize(databaseSizeBeforeUpdate);
        AssociationMember testAssociationMember = associationMemberList.get(associationMemberList.size() - 1);
        assertThat(testAssociationMember.isIsPresident()).isEqualTo(UPDATED_IS_PRESIDENT);
    }

    @Test
    @Transactional
    public void updateNonExistingAssociationMember() throws Exception {
        int databaseSizeBeforeUpdate = associationMemberRepository.findAll().size();

        // Create the AssociationMember

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssociationMemberMockMvc.perform(put("/api/association-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(associationMember)))
            .andExpect(status().isBadRequest());

        // Validate the AssociationMember in the database
        List<AssociationMember> associationMemberList = associationMemberRepository.findAll();
        assertThat(associationMemberList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAssociationMember() throws Exception {
        // Initialize the database
        associationMemberRepository.saveAndFlush(associationMember);

        int databaseSizeBeforeDelete = associationMemberRepository.findAll().size();

        // Get the associationMember
        restAssociationMemberMockMvc.perform(delete("/api/association-members/{id}", associationMember.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AssociationMember> associationMemberList = associationMemberRepository.findAll();
        assertThat(associationMemberList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssociationMember.class);
        AssociationMember associationMember1 = new AssociationMember();
        associationMember1.setId(1L);
        AssociationMember associationMember2 = new AssociationMember();
        associationMember2.setId(associationMember1.getId());
        assertThat(associationMember1).isEqualTo(associationMember2);
        associationMember2.setId(2L);
        assertThat(associationMember1).isNotEqualTo(associationMember2);
        associationMember1.setId(null);
        assertThat(associationMember1).isNotEqualTo(associationMember2);
    }
}
