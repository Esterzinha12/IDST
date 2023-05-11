const { it } = require("node:test");

describe('Teste do processo Pauta', () => {
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

    it('Criação Ata', () => {
        const minute = {
            "minuteName": "Ata 1",
            "minuteStartDate": "2023-05-09",
            "minuteEndDate": "2023-05-30",
            "minuteType": "1",
            "agenda": { "agendaCode": 5 },
            "director": { "workerCode": 1 }
        }

        cy.request('POST', "localhost:8443/api/minutes", minute).as('MinuteRequest');
        cy.get('@MinuteRequest').then((response) => {
            expect(response.status).to.not.eq(500)

        })
    })

    it('Criação Comissão', () => {
        const commission = {
            "commissionCode": 20,
            "commissionName": "Comissão",
            "commissionAcronym": "CL"
        }

        cy.request('POST', "localhost:8443/api/commission", commission).as('CommissionRequest');
        cy.get('@CommissionRequest').then((response) => {
            expect(response.status).to.not.eq(500)

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

    it('Criar Proposta', () => {
        const proposal = {
            "proposalCode": 1,
            "proposalName": "Nome da Proposta",
            "proposalStatus": "Backlog",
            "payback": 1.0,
            "initialRunPeriod": "2023-01-01",
            "finalExecutionPeriod": "2023-01-01",
            "descriptiveProposal": "Descritivo da Proposta",
            "responsibleAnalyst": { "workerCode": 2 },
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

    
    it('Buscar lista de Pautas', () => {
        cy.request('GET', "localhost:8443/api/agenda").as('GETpast');
        cy.get('@GETpast').then((response) => {
            sizePast = response.body.length;
        })
    })

    it('Criação Pauta', () => {
        const agenda = {
            "sequentialNumber": 2,
            "yearAgenda": 2023,
            "agendaDate": "2023-05-09",
            "minutes": [{ "minuteCode": 1 }],
            "commission": [{ "commissionCode": 1 }],
            "proposals": [{ "proposalCode": 1 }]
        }

        cy.request('POST', "localhost:8443/api/agenda", agenda).as('AgendaRequest');
        cy.get('@AgendaRequest').then((response) => {
            expect(response.status).to.not.eq(500)

        })
    })

    it('Verifica tamanho da lista', () => {
        cy.request('GET', "localhost:8443/api/agenda").as('GETDemand');
        cy.get('@GETDemand').then((response) => {
            expect(response.body.length).to.not.eq(sizePast)
        })
    })
})