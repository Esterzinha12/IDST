describe('Teste de Processo Proposta', () => {
    cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");

    it('Criar Funcionário', () => {
        // Objeto funcionário
        const worker = {
            "workerCode": 5,
            "workerName": "Funcionário N°5",
            "corporateEmail": "funcionario@weg.net",
            "workerPassword": "123",
            "workerOffice": "requester",
            "language": "pt"
        }

        cy.request('POST', "localhost:8443/api/worker", worker).as('WorkerRequest');
        cy.get('@WorkerRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })

    it('Criar Demanda', () => {
        // Objeto demanda
        const demand = {
            "demandTitle": "Título demanda",
            "currentProblem": "Problema",
            "demandObjective": "Objetivo",
            "demandStatus": "Backlog",
            "score": 50,
            "executionPeriod": "1 mês",
            "requesterRegistration": { "workerCode": 5 },
            "realBenefit": { "realBenefitCode": 1 },
            "qualitativeBenefit": { "qualitativeBenefitCode": 1 },
            "potentialBenefit": { "potentialBenefitCode": 1 },
            "costCenter": [{ "costCenterCode": 1 }]
        }

        cy.request('POST', "localhost:8443/api/demand", demand).as('DemandRequest');
        cy.get('@DemandRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })

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
            "responsibleAnalyst": { "workerCode": 5 },
            "demand": { "demandCode": 1, "demandVersion": 1 },
            "totalCosts": 2.0,
            "externalCosts": 1.0,
            "internalCosts": 1.0,
            "workers": [
                { "workerCode": 1 },
                { "workerCode": 2 }
            ],
            "proposalDate": "10/05/2023",
            "commissionOpinion": "Opinião da comissão",
            "published": true
        }

        cy.request('POST', "localhost:8443/api/proposal", proposal).as('ProposalRequest');
        cy.get('@ProposalRequest').then((response) => {
            expect(response.body).to.not.eq(500);
        })
    })

})