describe("add-api", () => {
    const filePath = "fixtures/wallet-balance.json"
    const pendingJson = require("../"+filePath)
    const apiJson = pendingJson.apiJson

    before(() => {
        cy.visit("");
        cy.setCookie("u", "MTY5NDY2MzA3NHxEdi1CQkFFQ180SUFBUXdCRUFBQUp2LUNBQUlDYVdRRmFXNTBOalFFQWdBQ0JHNWhiV1VHYzNSeWFXNW5EQWNBQldGa2JXbHV8sGm3daaie2dhb0sh5Fh4JHN6JifUBM1Z4FR53nU-P1k=")
        // cy.reload()
        cy.getAllCookies().then(cookies => {
            cy.log(cookies)
        })
    })

    after(() => {
        // Change json state
        cy.readFile("cypress/"+filePath).then(fileJson => {
        fileJson.isDone = true
        cy.writeFile("cypress/"+filePath, fileJson)
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
