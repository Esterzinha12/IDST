describe('Teste do processo Ata', () => {
   
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

    it('Criação Comissão', () => {


        const commission = {
            "commissionCode": 20,
            "commissionName":"Comissão",
            "commissionAcronym":"CL"
        }

        cy.request('POST', "localhost:8443/api/commission", commission).as('CommissionRequest');
        cy.get('@CommissionRequest').then((response) => {
            expect(response.status).to.not.eq(500)

        })
    })

    it('Criar Proposta', () => {


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

    it('Criação Pauta', () => {
        const agenda = {
            "sequentialNumber": 2,
            "yearAgenda": 2023,
            "agendaDate": "2023-05-09",
            "minutes": [{ "minuteCode": null }],
            "commission": [{ "commissionCode": 1 }],
            "proposals": [{ "proposalCode": 1 }]
        }

        cy.request('POST', "localhost:8443/api/agenda", agenda).as('AgendaRequest');
        cy.get('@AgendaRequest').then((response) => {
            expect(response.status).to.not.eq(500)

        })
    })

    it('Criar Funcionário', () => {
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
   
    it('Criação Ata', () => {
        const minute = {
            "minuteName":"Ata 1",
            "minuteStartDate":"2023-05-09",
            "minuteEndDate":"2023-05-30",
            "minuteType":"1",
            "agenda":{"agendaCode": 5},
            "director":{"workerCode": 1}
        }

        let sizePast;

        cy.request('GET', "localhost:8443/api/minutes").as('GETpast');
        cy.get('@GETpast').then((response) => {
            sizePast = response.body.length;
        })
        cy.request('POST', "localhost:8443/api/minutes", minute).as('MinuteRequest');
        cy.get('@MinuteRequest').then((response) => {
            expect(response.status).to.not.eq(500)

        })
        cy.request('GET', "localhost:8443/api/proposal").as('GETpast');
        cy.get('@GETpast').then((response) => {
            expect(response.body.length).to.not.eq(sizePast)
        })
    })





})