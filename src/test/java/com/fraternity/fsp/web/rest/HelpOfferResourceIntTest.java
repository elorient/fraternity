package com.fraternity.fsp.web.rest;

import com.fraternity.fsp.FraternityApp;

import com.fraternity.fsp.domain.HelpOffer;
import com.fraternity.fsp.repository.HelpOfferRepository;
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
 * Test class for the HelpOfferResource REST controller.
 *
 * @see HelpOfferResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = FraternityApp.class)
public class HelpOfferResourceIntTest {

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
    private HelpOfferRepository helpOfferRepository;

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

    private MockMvc restHelpOfferMockMvc;

    private HelpOffer helpOffer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HelpOfferResource helpOfferResource = new HelpOfferResource(helpOfferRepository);
        this.restHelpOfferMockMvc = MockMvcBuilders.standaloneSetup(helpOfferResource)
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
    public static HelpOffer createEntity(EntityManager em) {
        HelpOffer helpOffer = new HelpOffer()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .datePost(DEFAULT_DATE_POST)
            .dateStart(DEFAULT_DATE_START)
            .dateEnd(DEFAULT_DATE_END);
        return helpOffer;
    }

    @Before
    public void initTest() {
        helpOffer = createEntity(em);
    }

    @Test
    @Transactional
    public void createHelpOffer() throws Exception {
        int databaseSizeBeforeCreate = helpOfferRepository.findAll().size();

        // Create the HelpOffer
        restHelpOfferMockMvc.perform(post("/api/help-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helpOffer)))
            .andExpect(status().isCreated());

        // Validate the HelpOffer in the database
        List<HelpOffer> helpOfferList = helpOfferRepository.findAll();
        assertThat(helpOfferList).hasSize(databaseSizeBeforeCreate + 1);
        HelpOffer testHelpOffer = helpOfferList.get(helpOfferList.size() - 1);
        assertThat(testHelpOffer.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testHelpOffer.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testHelpOffer.getDatePost()).isEqualTo(DEFAULT_DATE_POST);
        assertThat(testHelpOffer.getDateStart()).isEqualTo(DEFAULT_DATE_START);
        assertThat(testHelpOffer.getDateEnd()).isEqualTo(DEFAULT_DATE_END);
    }

    @Test
    @Transactional
    public void createHelpOfferWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = helpOfferRepository.findAll().size();

        // Create the HelpOffer with an existing ID
        helpOffer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHelpOfferMockMvc.perform(post("/api/help-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helpOffer)))
            .andExpect(status().isBadRequest());

        // Validate the HelpOffer in the database
        List<HelpOffer> helpOfferList = helpOfferRepository.findAll();
        assertThat(helpOfferList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHelpOffers() throws Exception {
        // Initialize the database
        helpOfferRepository.saveAndFlush(helpOffer);

        // Get all the helpOfferList
        restHelpOfferMockMvc.perform(get("/api/help-offers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(helpOffer.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].datePost").value(hasItem(DEFAULT_DATE_POST.toString())))
            .andExpect(jsonPath("$.[*].dateStart").value(hasItem(DEFAULT_DATE_START.toString())))
            .andExpect(jsonPath("$.[*].dateEnd").value(hasItem(DEFAULT_DATE_END.toString())));
    }
    
    @Test
    @Transactional
    public void getHelpOffer() throws Exception {
        // Initialize the database
        helpOfferRepository.saveAndFlush(helpOffer);

        // Get the helpOffer
        restHelpOfferMockMvc.perform(get("/api/help-offers/{id}", helpOffer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(helpOffer.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.datePost").value(DEFAULT_DATE_POST.toString()))
            .andExpect(jsonPath("$.dateStart").value(DEFAULT_DATE_START.toString()))
            .andExpect(jsonPath("$.dateEnd").value(DEFAULT_DATE_END.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHelpOffer() throws Exception {
        // Get the helpOffer
        restHelpOfferMockMvc.perform(get("/api/help-offers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHelpOffer() throws Exception {
        // Initialize the database
        helpOfferRepository.saveAndFlush(helpOffer);

        int databaseSizeBeforeUpdate = helpOfferRepository.findAll().size();

        // Update the helpOffer
        HelpOffer updatedHelpOffer = helpOfferRepository.findById(helpOffer.getId()).get();
        // Disconnect from session so that the updates on updatedHelpOffer are not directly saved in db
        em.detach(updatedHelpOffer);
        updatedHelpOffer
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .datePost(UPDATED_DATE_POST)
            .dateStart(UPDATED_DATE_START)
            .dateEnd(UPDATED_DATE_END);

        restHelpOfferMockMvc.perform(put("/api/help-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHelpOffer)))
            .andExpect(status().isOk());

        // Validate the HelpOffer in the database
        List<HelpOffer> helpOfferList = helpOfferRepository.findAll();
        assertThat(helpOfferList).hasSize(databaseSizeBeforeUpdate);
        HelpOffer testHelpOffer = helpOfferList.get(helpOfferList.size() - 1);
        assertThat(testHelpOffer.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testHelpOffer.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testHelpOffer.getDatePost()).isEqualTo(UPDATED_DATE_POST);
        assertThat(testHelpOffer.getDateStart()).isEqualTo(UPDATED_DATE_START);
        assertThat(testHelpOffer.getDateEnd()).isEqualTo(UPDATED_DATE_END);
    }

    @Test
    @Transactional
    public void updateNonExistingHelpOffer() throws Exception {
        int databaseSizeBeforeUpdate = helpOfferRepository.findAll().size();

        // Create the HelpOffer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHelpOfferMockMvc.perform(put("/api/help-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(helpOffer)))
            .andExpect(status().isBadRequest());

        // Validate the HelpOffer in the database
        List<HelpOffer> helpOfferList = helpOfferRepository.findAll();
        assertThat(helpOfferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHelpOffer() throws Exception {
        // Initialize the database
        helpOfferRepository.saveAndFlush(helpOffer);

        int databaseSizeBeforeDelete = helpOfferRepository.findAll().size();

        // Get the helpOffer
        restHelpOfferMockMvc.perform(delete("/api/help-offers/{id}", helpOffer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HelpOffer> helpOfferList = helpOfferRepository.findAll();
        assertThat(helpOfferList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HelpOffer.class);
        HelpOffer helpOffer1 = new HelpOffer();
        helpOffer1.setId(1L);
        HelpOffer helpOffer2 = new HelpOffer();
        helpOffer2.setId(helpOffer1.getId());
        assertThat(helpOffer1).isEqualTo(helpOffer2);
        helpOffer2.setId(2L);
        assertThat(helpOffer1).isNotEqualTo(helpOffer2);
        helpOffer1.setId(null);
        assertThat(helpOffer1).isNotEqualTo(helpOffer2);
    }
}
