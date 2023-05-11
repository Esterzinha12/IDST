describe('Teste Integração Pauta', () => {
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

    it('Verificar Pauta', () => {
        cy.request('GET', "localhost:8443/api/agenda").as('AgendaRequest');
        cy.get('@AgendaRequest').then((response) => {
            expect(response.body).to.be.an('array');
        })
    })
})