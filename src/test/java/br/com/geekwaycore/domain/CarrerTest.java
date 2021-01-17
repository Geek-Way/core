package br.com.geekwaycore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.geekwaycore.web.rest.TestUtil;

public class CarrerTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Carrer.class);
        Carrer carrer1 = new Carrer();
        carrer1.setId(1L);
        Carrer carrer2 = new Carrer();
        carrer2.setId(carrer1.getId());
        assertThat(carrer1).isEqualTo(carrer2);
        carrer2.setId(2L);
        assertThat(carrer1).isNotEqualTo(carrer2);
        carrer1.setId(null);
        assertThat(carrer1).isNotEqualTo(carrer2);
    }
}
