describe('Teste Carga 1000x Pauta', () => {
    for (let i = 0; i < 1000; i++) {
        it('Verificar Pauta', () => {
            cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
            cy.request('GET', "localhost:8443/api/agenda").as('AgendaRequest');
            cy.get('@AgendaRequest').then((response) => {
                expect(response.body).to.be.an('array');
                expect(response.duration).to.be.lte(60);
                expect(response.status).to.eq(302);
            })
        })
    }
})