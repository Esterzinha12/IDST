describe('Teste de Carga 1000x Demanda', () => {
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

    for (let i = 0; i < 1000; i++) {
        it('Verificar Demanda', () => {
            cy.request('GET', "localhost:8443/api/demand").as('DemandRequest');
            cy.get('@DemandRequest').then((response) => {
                expect(response.body).to.be.an('array');
                expect(response.duration).to.be.lte(20);
                expect(response.status).to.eq(302);
            })
        })
    }
})