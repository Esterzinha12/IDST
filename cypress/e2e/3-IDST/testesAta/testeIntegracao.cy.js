describe('Teste de Integração', () => {
    it('Verificar Ata', () => {
        cy.request('GET', "localhost:8443/api/minute").as('MinuteRequest');
        cy.get('@MinuteRequest').then((response) => {
            expect(response.body).to.be.an('array');
        })
    })
})