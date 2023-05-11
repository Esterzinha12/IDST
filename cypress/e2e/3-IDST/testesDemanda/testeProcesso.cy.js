describe('Teste de Processo Demanda', () => {
    let sizePast;

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

    it('Cadastrar Beneficio Real', () => {
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
        const costCenter = {
            "costCenter": "WEG Ações Nacionais"
        }
        cy.request('POST', "localhost:8443/api/costcenter", costCenter).as('LoginRequest');
        cy.get('@LoginRequest').then((response) => {
            expect(response.status).to.not.eq(500);
        })
    })

    it('Verificar demanda', () => {
        cy.request('GET', "localhost:8443/api/demand").as('GETpast');
        cy.get('@GETpast').then((response) => {
            sizePast = response.body.length;
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

    it("Verificar demanda", () => {
        cy.request('GET', "localhost:8443/api/demand").as('GETDemand');
        cy.get('@GETDemand').then((response) => {
            expect(response.body.length).to.not.eq(sizePast)
        })
    })

})

