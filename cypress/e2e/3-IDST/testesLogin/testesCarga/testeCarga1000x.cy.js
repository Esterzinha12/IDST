describe('Teste de Carga 1000x Login', () => {
    it('Verificar Login', () => {
        const user = {
            "corporateEmail": "vytor@weg.net",
            "workerPassword": "123"
        }
        for(let i = 0; i < 1000; i++){
        cy.request('POST', "localhost:8443/login/auth", user).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            expect(response.status).to.not.eq(500);
            expect(response.duration).to.be.lte(30);
        })
    }
    })
})