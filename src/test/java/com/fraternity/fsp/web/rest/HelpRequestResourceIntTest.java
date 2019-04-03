package com.fraternity.fsp.web.rest;

import com.fraternity.fsp.FraternityApp;

import com.fraternity.fsp.domain.HelpRequest;
import com.fraternity.fsp.repository.HelpRequestRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.fraternity.fsp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the HelpRequestResource REST controller.
 *
 * @see HelpRequestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FraternityApp.class)
public class HelpRequestResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_POST = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_POST = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_START = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_END = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_END = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private HelpRequestRepository helpRequestRepository;

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

    private MockMvc restHelpRequestMockMvc;

    private HelpRequest helpRequest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HelpRequestResource helpRequestResource = new HelpRequestResource(helpRequestRepository);
        this.restHelpRequestMockMvc = MockMvcBuilders.standaloneSetup(helpRequestResource)
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
    public static HelpRequest createEntity(EntityManager em) {
        HelpRequest helpRequest = new HelpRequest()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .datePost(DEFAULT_DATE_POST)
            .dateStart(DEFAULT_DATE_START)
            .dateEnd(DEFAULT_DATE_END);
        return helpRequest;
    }

    @Before
    public void initTest() {
        helpRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createHelpRequest() throws Exception {
        int databaseSizeBeforeCreate = helpRequestRepository.findAll().size();

        // Create the HelpRequest
        restHelpRequestMockMvc.perform(post("/api/help-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helpRequest)))
            .andExpect(status().isCreated());

        // Validate the HelpRequest in the database
        List<HelpRequest> helpRequestList = helpRequestRepository.findAll();
        assertThat(helpRequestList).hasSize(databaseSizeBeforeCreate + 1);
        HelpRequest testHelpRequest = helpRequestList.get(helpRequestList.size() - 1);
        assertThat(testHelpRequest.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testHelpRequest.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testHelpRequest.getDatePost()).isEqualTo(DEFAULT_DATE_POST);
        assertThat(testHelpRequest.getDateStart()).isEqualTo(DEFAULT_DATE_START);
        assertThat(testHelpRequest.getDateEnd()).isEqualTo(DEFAULT_DATE_END);
    }

    @Test
    @Transactional
    public void createHelpRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = helpRequestRepository.findAll().size();

        // Create the HelpRequest with an existing ID
        helpRequest.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHelpRequestMockMvc.perform(post("/api/help-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helpRequest)))
            .andExpect(status().isBadRequest());

        // Validate the HelpRequest in the database
        List<HelpRequest> helpRequestList = helpRequestRepository.findAll();
        assertThat(helpRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHelpRequests() throws Exception {
        // Initialize the database
        helpRequestRepository.saveAndFlush(helpRequest);

        // Get all the helpRequestList
        restHelpRequestMockMvc.perform(get("/api/help-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(helpRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].datePost").value(hasItem(DEFAULT_DATE_POST.toString())))
            .andExpect(jsonPath("$.[*].dateStart").value(hasItem(DEFAULT_DATE_START.toString())))
            .andExpect(jsonPath("$.[*].dateEnd").value(hasItem(DEFAULT_DATE_END.toString())));
    }
    
    @Test
    @Transactional
    public void getHelpRequest() throws Exception {
        // Initialize the database
        helpRequestRepository.saveAndFlush(helpRequest);

        // Get the helpRequest
        restHelpRequestMockMvc.perform(get("/api/help-requests/{id}", helpRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(helpRequest.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.datePost").value(DEFAULT_DATE_POST.toString()))
            .andExpect(jsonPath("$.dateStart").value(DEFAULT_DATE_START.toString()))
            .andExpect(jsonPath("$.dateEnd").value(DEFAULT_DATE_END.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHelpRequest() throws Exception {
        // Get the helpRequest
        restHelpRequestMockMvc.perform(get("/api/help-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHelpRequest() throws Exception {
        // Initialize the database
        helpRequestRepository.saveAndFlush(helpRequest);

        int databaseSizeBeforeUpdate = helpRequestRepository.findAll().size();

        // Update the helpRequest
        HelpRequest updatedHelpRequest = helpRequestRepository.findById(helpRequest.getId()).get();
        // Disconnect from session so that the updates on updatedHelpRequest are not directly saved in db
        em.detach(updatedHelpRequest);
        updatedHelpRequest
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .datePost(UPDATED_DATE_POST)
            .dateStart(UPDATED_DATE_START)
            .dateEnd(UPDATED_DATE_END);

        restHelpRequestMockMvc.perform(put("/api/help-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHelpRequest)))
            .andExpect(status().isOk());

        // Validate the HelpRequest in the database
        List<HelpRequest> helpRequestList = helpRequestRepository.findAll();
        assertThat(helpRequestList).hasSize(databaseSizeBeforeUpdate);
        HelpRequest testHelpRequest = helpRequestList.get(helpRequestList.size() - 1);
        assertThat(testHelpRequest.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testHelpRequest.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testHelpRequest.getDatePost()).isEqualTo(UPDATED_DATE_POST);
        assertThat(testHelpRequest.getDateStart()).isEqualTo(UPDATED_DATE_START);
        assertThat(testHelpRequest.getDateEnd()).isEqualTo(UPDATED_DATE_END);
    }

    @Test
    @Transactional
    public void updateNonExistingHelpRequest() throws Exception {
        int databaseSizeBeforeUpdate = helpRequestRepository.findAll().size();

        // Create the HelpRequest

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHelpRequestMockMvc.perform(put("/api/help-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helpRequest)))
            .andExpect(status().isBadRequest());

        // Validate the HelpRequest in the database
        List<HelpRequest> helpRequestList = helpRequestRepository.findAll();
        assertThat(helpRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHelpRequest() throws Exception {
        // Initialize the database
        helpRequestRepository.saveAndFlush(helpRequest);

        int databaseSizeBeforeDelete = helpRequestRepository.findAll().size();

        // Get the helpRequest
        restHelpRequestMockMvc.perform(delete("/api/help-requests/{id}", helpRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HelpRequest> helpRequestList = helpRequestRepository.findAll();
        assertThat(helpRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HelpRequest.class);
        HelpRequest helpRequest1 = new HelpRequest();
        helpRequest1.setId(1L);
        HelpRequest helpRequest2 = new HelpRequest();
        helpRequest2.setId(helpRequest1.getId());
        assertThat(helpRequest1).isEqualTo(helpRequest2);
        helpRequest2.setId(2L);
        assertThat(helpRequest1).isNotEqualTo(helpRequest2);
        helpRequest1.setId(null);
        assertThat(helpRequest1).isNotEqualTo(helpRequest2);
    }
}
