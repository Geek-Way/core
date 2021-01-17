package br.com.geekwaycore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.geekwaycore.web.rest.TestUtil;

public class ProofTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Proof.class);
        Proof proof1 = new Proof();
        proof1.setId(1L);
        Proof proof2 = new Proof();
        proof2.setId(proof1.getId());
        assertThat(proof1).isEqualTo(proof2);
        proof2.setId(2L);
        assertThat(proof1).isNotEqualTo(proof2);
        proof1.setId(null);
        assertThat(proof1).isNotEqualTo(proof2);
    }
}
