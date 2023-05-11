describe('Teste de Integração', () => {
    beforeEach(() => {
        const user = {
            "corporateEmail": "vytor@weg.net",
            "workerPassword": "123"
        }
        cy.request('POST', "localhost:8443/login/auth", user).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            console.log(response);
            expect(response.status).to.not.eq(500);
        })
    })

    it('Verificar Proposta', () => {
        cy.request('GET', "localhost:8443/api/proposal").as('ProposalRequest');
        cy.get('@ProposalRequest').then((response) => {
            expect(response.body).to.be.an('array');
        })
    })
})