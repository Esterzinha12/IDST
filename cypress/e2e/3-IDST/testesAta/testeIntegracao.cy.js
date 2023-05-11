describe('Teste de Integração', () => {
    it('Verificar Ata', () => {
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        cy.request('GET', "localhost:8443/api/minutes").as('MinuteRequest');
        cy.get('@MinuteRequest').then((response) => {
            expect(response.body).to.be.an('array');
            expect(response.status).to.eq(302);
        })
    })
})