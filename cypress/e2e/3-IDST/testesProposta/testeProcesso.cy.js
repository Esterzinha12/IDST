describe('Teste de Processo Proposta', () => {
    it('Criar Proposta', () => {
        const proposal = {
            "proposalCode": 1,
            "proposalName": "Nome da Proposta",
            "proposalStatus": "Backlog",
            "payback": 1.0,
            "initialRunPeriod": 2023-01-01,
            "finalExecutionPeriod": 2023-01-01,
            "descriptiveProposal": "Descritivo da Proposta",
            "responsibleAnalyst": {"workerCode": 2},
            "demand": {"demandCode": 1},
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

        cy.get('POST', "localhost:8443/api/proposal", proposal).as('ProposalRequest');
        cy.get('@ProposalRequest').then((response) => {
            expect(response.body).to.not(500);
        })
    })

})