
describe('Teste de Integração Demanda', () => {
    it('Verificar Demanda', () => {
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");

        const demand = {
            "demandTitle": "titulo",
            "currentProblem": "problema",
            "demandObjective": "objetivo",
            "demandStatus": "status",
            "score": 50,
            "executionPeriod": "1 mês",
            "requesterRegistration": { "workerCode": 2 },
            "realBenefit": { "realBenefitCode": 1 },
            "qualitativeBenefit": { "qualitativeBenefitCode": 1 },
            "potentialBenefit": { "potentialBenefitCode": 1 },
            "costCenter": [{ "costCenterCode": 1 }]
        }

        let formData = new FormData();
        formData.append('demandAttachment', null);
        formData.append('demand', JSON.stringify(demand));

        cy.request('POST', "localhost:8443/api/demand", formData).as('DemandRequest');
        cy.get('@DemandRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })
})

