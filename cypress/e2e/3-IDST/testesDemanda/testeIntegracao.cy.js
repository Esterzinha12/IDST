describe('Teste de Integração Demanda', () => {
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

    it('Cadastrar Demanda', () => {
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

