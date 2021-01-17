package br.com.geekwaycore.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.geekwaycore.web.rest.TestUtil;

public class UserCaseCompanyTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserCaseCompany.class);
        UserCaseCompany userCaseCompany1 = new UserCaseCompany();
        userCaseCompany1.setId(1L);
        UserCaseCompany userCaseCompany2 = new UserCaseCompany();
        userCaseCompany2.setId(userCaseCompany1.getId());
        assertThat(userCaseCompany1).isEqualTo(userCaseCompany2);
        userCaseCompany2.setId(2L);
        assertThat(userCaseCompany1).isNotEqualTo(userCaseCompany2);
        userCaseCompany1.setId(null);
        assertThat(userCaseCompany1).isNotEqualTo(userCaseCompany2);
    }
}
