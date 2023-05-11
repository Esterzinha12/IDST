describe('Teste de Processo Proposta', () => {
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

    it('Criar Funcionário', () => {
        // Objeto funcionário
        const worker = {
            "workerCode": 5,
            "workerName": "Funcionário",
            "corporateEmail": "funcionario@weg.net",
            "workerPassword": "123",
            "workerOffice": "requester",
            "language": "pt"
        }

        cy.request('POST', "localhost:8443/api/worker/1", worker).as('WorkerRequest');
        cy.get('@WorkerRequest').then((response) => {
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
            "requesterRegistration": { "workerCode": 5 },
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

    it('Buscar lista de Proposta', () => {
        cy.request('GET', "localhost:8443/api/proposal").as('GETpast');
        cy.get('@GETpast').then((response) => {
            sizePast = response.body.length;
        })
    })

    it('Criar Proposta', () => {
        const proposal = {
            "proposalName": "VYTOR",
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

    it('Verificação do tamanho da lista', () => {
        cy.request('GET', "localhost:8443/api/proposal").as('GETpast');
        cy.get('@GETpast').then((response) => {
            expect(response.body.length).to.not.eq(sizePast)
        })
    })

})