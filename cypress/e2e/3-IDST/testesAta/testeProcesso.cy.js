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

    it('Criação Pauta', () => {
        const agenda = {
            "sequentialNumber": 2,
            "yearAgenda": 2023,
            "agendaDate": "2023-05-09",
            "minutes": [{ "minuteCode": 2 }],
            "commission": [{ "commissionCode": 2 }],
            "proposals": [{ "proposalCode": 2 }]
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
            "agenda":{"agendaCode": 1},
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
        cy.request('GET', "localhost:8443/api/minutes").as('GETpast');
        cy.get('@GETpast').then((response) => {
            expect(response.body.length).to.not.eq(sizePast)
        })
    })
})