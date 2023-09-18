describe("add-api", () => {
    // !Modify the following fileName before running: fileName and pendingJson
    const fileName = "txs.json"
    const pendingJson = require("../fixtures/"+"txs.json")

    const apiJson = pendingJson.apiJson

    before(() => {
        const ACCOUNT = Cypress.env("ACCOUNT")
        const PASSWORD = Cypress.env("PASSWORD")
        cy.login(ACCOUNT, PASSWORD)
    })

    after(() => {
        // Change json state
        cy.readFile("cypress/fixtures/"+fileName).then(fileJson => {
        fileJson.isDone = true
        cy.writeFile("cypress/fixtures/"+fileName, fileJson)
        })
    })

    apiJson.forEach(apiData => {
        it(`Add API ${apiData.tags}`, () => {
            // Determine if it has been processed
            cy.log(pendingJson.isDone)
            if (pendingJson.isDone) {
                cy.log("This json has already been processed. Do not proceed.")
                cy.pause()
            }

            // Required information
            cy.get('.pull-right').click()
            cy.get("#method").select(apiData.method)
            cy.get('#url').type(apiData.api)
            cy.get('#expect_code').type(apiData["status-code"])
            cy.get('#timeout').type(apiData.timeout)
            cy.get('#note').type(apiData.remark)
            cy.get('#s2id_autogen1').type(apiData.warnReceive)
            cy.get('.select2-results').contains(apiData.warnReceive).click()
            cy.get('#max_step').type(apiData.sendTime)

            // Advanced
            cy.get('.panel-title > a').click()
            if (apiData.header) {
                cy.get('#header').type(apiData.header)
            }
            if (apiData.postData) {
                cy.get('#post_data').type(JSON.stringify(apiData.postData), {parseSpecialCharSequences:false})
            }
            cy.get('#endpoint').type(apiData.endpoint)
            cy.get('#tags').type(apiData.tags)
            cy.get('#submit').click()

            cy.contains("恭喜")

        })
    })

    
})
