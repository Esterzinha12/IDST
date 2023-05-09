describe('Teste de Processo Proposta', () => {
    it('Criar Proposta', () => {

        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");

        const proposal = {
            "proposalCode": 1,
            "proposalName": "Nome da Proposta",
            "proposalStatus": "Backlog",
            "payback": 1.0,
            "initialRunPeriod": "2023-01-01",
            "finalExecutionPeriod": "2023-01-01",
            "descriptiveProposal": "Descritivo da Proposta",
            "responsibleAnalyst": {"workerCode": 2},
            "demand": {"demandCode": 1, "demandVersion": 1},
            "totalCosts": 2.0,
            "externalCosts": 1.0,
            "internalCosts": 1.0,
            "workers": [
                {"workerCode": 1},
                {"workerCode": 2}
            ],
            "proposalDate": "10/05/2023",
            "commissionOpinion": "Opinião da comissão",
            "published" : true
        }

        cy.request('POST', "localhost:8443/api/proposal", proposal).as('ProposalRequest');
        cy.get('@ProposalRequest').then((response) => {
            expect(response.body).to.not.eq(500);
        })
    })

})