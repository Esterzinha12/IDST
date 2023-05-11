describe('Teste de Carga 500x Demanda', () => {
    for (let i = 0; i < 500; i++) {
        it('Verificar Demanda', () => {
            cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
            cy.request('GET', "localhost:8443/api/demand").as('DemandRequest');
            cy.get('@DemandRequest').then((response) => {
                expect(response.body).to.be.an('array');
                expect(response.duration).to.be.lte(20);
                expect(response.status).to.eq(302);
            })
        })
    }
})