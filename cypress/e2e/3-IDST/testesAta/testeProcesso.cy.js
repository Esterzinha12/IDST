describe('Teste do processo Ata', () => {
    it('Criação Ata', () => {
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        const minute = {
            "minuteName":"Ata 1",
            "minuteStartDate":"2023-05-09",
            "minuteEndDate":"2023-05-30",
            "minuteType":"1",
            "agenda":{"agendaCode": 1},
            "director":{"workerCode": 1}
        }

        cy.request('POST', "localhost:8443/api/minutes", minute).as('MinuteRequest');
        cy.get('@MinuteRequest').then((response) => {
            expect(response.status).to.not.eq(500)

        })
    })
})