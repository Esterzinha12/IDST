describe('Teste de Integração Login', () => {
    it('Verificar Login', () => {
        const user = {
            "corporateEmail": "vytor@weg.net",
            "workerPassword": "123"
        }
        cy.request('POST', "localhost:8443/login/auth", user).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })
})