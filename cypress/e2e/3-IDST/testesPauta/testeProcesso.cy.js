describe('Teste do processo Pauta', () => {
    it('Criação Pauta', () => {
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        const agenda = {
            "sequentialNumber": 2,
            "yearAgenda": 2023,
            "agendaDate": "2023-05-09",
            "minutes": [{ "minuteCode": 2 }],
            "commission": [{ "commissionCode": 2 }],
            "proposals": [{ "proposalCode": 2 }]
        }

        cy.request('POST', "localhost:8443/api/agenda", agenda).as('AgendaRequest');
        cy.get('@AgendaRequest').then((response) => {
            expect(response.status).to.not.eq(500)

        })
    })
})