describe('Teste de Processo Login', () => {
    it('Cadastrar Funcionario', () => {
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        const user = {
            "workerCode": "7334",
            "workerName": "Alisson Ferraz",
            "corporateEmail": "alisson@weg.net",
            "workerPassword": "123",
            "language": "pt"
        }
        cy.request('POST', "localhost:8443/api/worker/3", user).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })

    it('Verificar Login', () => {
        const user = {
            "corporateEmail": "alisson@weg.net",
            "workerPassword": "123"
        }
        cy.request('POST', "localhost:8443/login/auth", user).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })
})