package br.com.geekwaycore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.geekwaycore.web.rest.TestUtil;

public class VocationalTestTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VocationalTest.class);
        VocationalTest vocationalTest1 = new VocationalTest();
        vocationalTest1.setId(1L);
        VocationalTest vocationalTest2 = new VocationalTest();
        vocationalTest2.setId(vocationalTest1.getId());
        assertThat(vocationalTest1).isEqualTo(vocationalTest2);
        vocationalTest2.setId(2L);
        assertThat(vocationalTest1).isNotEqualTo(vocationalTest2);
        vocationalTest1.setId(null);
        assertThat(vocationalTest1).isNotEqualTo(vocationalTest2);
    }
}
