describe('Teste de Carga 100x Proposta', () => {
    it('Verificar Proposta', () => {
        for(let i = 0; i < 100; i++){
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        cy.request('GET', "localhost:8443/api/proposal").as('ProposalRequest');
        cy.get('@ProposalRequest').then((response) => {
            expect(response.body).to.be.an('array');
        })
    }
    })
})