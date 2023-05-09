describe('Teste de Processo Demanda', () => {

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
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        const user = {
            "corporateEmail": "alisson@weg.net",
            "workerPassword": "123"
        }
        cy.request('POST', "localhost:8443/login/auth", user).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })

    it('Cadastrar Beneficio Real', () => {
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        const realBenefit = {
            "realMonthlyValue": 50.0,
            "realBenefitDescription": "muito",
            "realCurrency": "real"
        }
        cy.request('POST', "localhost:8443/api/realbenefit", realBenefit).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })

    it('Cadastrar Beneficio Qualitativo', () => {
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        const qualitativeBenefit = {
            "frequencyOfUse": "muito",
            "qualitativeBenefitDescription": "123",
            "interalControlsRequirements": true
        }
        cy.request('POST', "localhost:8443/api/qualitativebenefit", qualitativeBenefit).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })

    it('Cadastrar Beneficio Potencial', () => {
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        const potentialBenefit = {
            "potentialMonthlyValue": 50.00,
            "legalObrigation": true,
            "potentialCurrency": "real",
            "potentialBenefitDescription": "123"
        }
        cy.request('POST', "localhost:8443/api/potentialbenefit", potentialBenefit).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })

    it('Cadastrar Centro de Custo', () => {
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        const costCenter = {
            "costCenter": "WEG Ações Nacionais"
        }
        cy.request('POST', "localhost:8443/api/costcenter", costCenter).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })

    it('Cadastrar Demanda', () => {
        cy.setCookie("jwt", "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJpZHMiLCJzdWIiOiIyIiwiaWF0IjoxNjgzNTg5ODE1LCJleHAiOjE2ODM3Njk4MTV9.4Eu-pKnjlq5wIE-ZB5A52dCxxXvfvv45mKovfid5yZk");
        const demand = {
            "demandTitle": "titulo",
            "currentProblem": "problema",
            "demandObjective": "objetivo",
            "demandStatus": "status",
            "score": 50,
            "executionPeriod": "1 mês",
            "requesterRegistration": { "workerCode": 7334 },
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

