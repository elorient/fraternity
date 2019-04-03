package com.fraternity.fsp.web.rest;

import com.fraternity.fsp.FraternityApp;

import com.fraternity.fsp.domain.HelpAction;
import com.fraternity.fsp.repository.HelpActionRepository;
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
 * Test class for the HelpActionResource REST controller.
 *
 * @see HelpActionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FraternityApp.class)
public class HelpActionResourceIntTest {

    @Autowired
    private HelpActionRepository helpActionRepository;

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

    private MockMvc restHelpActionMockMvc;

    private HelpAction helpAction;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HelpActionResource helpActionResource = new HelpActionResource(helpActionRepository);
        this.restHelpActionMockMvc = MockMvcBuilders.standaloneSetup(helpActionResource)
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
    public static HelpAction createEntity(EntityManager em) {
        HelpAction helpAction = new HelpAction();
        return helpAction;
    }

    @Before
    public void initTest() {
        helpAction = createEntity(em);
    }

    @Test
    @Transactional
    public void createHelpAction() throws Exception {
        int databaseSizeBeforeCreate = helpActionRepository.findAll().size();

        // Create the HelpAction
        restHelpActionMockMvc.perform(post("/api/help-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helpAction)))
            .andExpect(status().isCreated());

        // Validate the HelpAction in the database
        List<HelpAction> helpActionList = helpActionRepository.findAll();
        assertThat(helpActionList).hasSize(databaseSizeBeforeCreate + 1);
        HelpAction testHelpAction = helpActionList.get(helpActionList.size() - 1);
    }

    @Test
    @Transactional
    public void createHelpActionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = helpActionRepository.findAll().size();

        // Create the HelpAction with an existing ID
        helpAction.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHelpActionMockMvc.perform(post("/api/help-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helpAction)))
            .andExpect(status().isBadRequest());

        // Validate the HelpAction in the database
        List<HelpAction> helpActionList = helpActionRepository.findAll();
        assertThat(helpActionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHelpActions() throws Exception {
        // Initialize the database
        helpActionRepository.saveAndFlush(helpAction);

        // Get all the helpActionList
        restHelpActionMockMvc.perform(get("/api/help-actions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(helpAction.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getHelpAction() throws Exception {
        // Initialize the database
        helpActionRepository.saveAndFlush(helpAction);

        // Get the helpAction
        restHelpActionMockMvc.perform(get("/api/help-actions/{id}", helpAction.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(helpAction.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingHelpAction() throws Exception {
        // Get the helpAction
        restHelpActionMockMvc.perform(get("/api/help-actions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHelpAction() throws Exception {
        // Initialize the database
        helpActionRepository.saveAndFlush(helpAction);

        int databaseSizeBeforeUpdate = helpActionRepository.findAll().size();

        // Update the helpAction
        HelpAction updatedHelpAction = helpActionRepository.findById(helpAction.getId()).get();
        // Disconnect from session so that the updates on updatedHelpAction are not directly saved in db
        em.detach(updatedHelpAction);

        restHelpActionMockMvc.perform(put("/api/help-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHelpAction)))
            .andExpect(status().isOk());

        // Validate the HelpAction in the database
        List<HelpAction> helpActionList = helpActionRepository.findAll();
        assertThat(helpActionList).hasSize(databaseSizeBeforeUpdate);
        HelpAction testHelpAction = helpActionList.get(helpActionList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingHelpAction() throws Exception {
        int databaseSizeBeforeUpdate = helpActionRepository.findAll().size();

        // Create the HelpAction

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHelpActionMockMvc.perform(put("/api/help-actions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helpAction)))
            .andExpect(status().isBadRequest());

        // Validate the HelpAction in the database
        List<HelpAction> helpActionList = helpActionRepository.findAll();
        assertThat(helpActionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHelpAction() throws Exception {
        // Initialize the database
        helpActionRepository.saveAndFlush(helpAction);

        int databaseSizeBeforeDelete = helpActionRepository.findAll().size();

        // Get the helpAction
        restHelpActionMockMvc.perform(delete("/api/help-actions/{id}", helpAction.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HelpAction> helpActionList = helpActionRepository.findAll();
        assertThat(helpActionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HelpAction.class);
        HelpAction helpAction1 = new HelpAction();
        helpAction1.setId(1L);
        HelpAction helpAction2 = new HelpAction();
        helpAction2.setId(helpAction1.getId());
        assertThat(helpAction1).isEqualTo(helpAction2);
        helpAction2.setId(2L);
        assertThat(helpAction1).isNotEqualTo(helpAction2);
        helpAction1.setId(null);
        assertThat(helpAction1).isNotEqualTo(helpAction2);
    }
}
