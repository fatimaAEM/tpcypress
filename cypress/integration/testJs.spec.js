describe('Test JS',function(){


    // -> Function for inser items
    Cypress.Commands.add('insertItems', (items) => {
        for (var item = 0; item < items.length; item++) {
            cy.get('.new-todo')
            .type(items[item] + "{enter}")
        }  
    })

    Cypress.Commands.add('filterItems', (etat) => {
        cy.get('.filters')
        .contains(etat)
        .click()
        
    })

    // -> Function for inser items with state
    Cypress.Commands.add('inserItemWithState', (list) => {

        for (var iter = 0; iter < list.length; iter++) {
            cy.get('.new-todo')
            .type(list[iter] + "{enter}")
            if (list[iter][1] == "Active") {
                cy.get('.todo-list li')
                .eq(iter)
                .find(".toggle")
                .check()  
            }
        }
    })

   

    beforeEach(function () {
        cy.visit('http://todomvc.com/examples/jquery/')
    }) 
	
    it('Should add item', function () {
        cy.insertItems(['Javascript'])

        cy.get('.todo-list li')
        .should("have.length", 1)
        .and("contain","Javascript")
    })
	
	it('Should delete one item', function () {
        cy.insertItems(['Javascript'])

        cy.get('.todo-list li')
        .should("contain","Javascript")
        .find(".destroy")
        .invoke("show")
        .click()
        .should('not.exist')
    })   
	
    it('Should delete all items', function () {
        cy.insertItems(['Javascript','JEE','PHP'])

        cy.get('.todo-list li').each(function () {
            cy.get(".destroy").click({
				force : true, multiple: true
			})
        })
        
        cy.get('.todo-list li')
        .should('have.length', 0)
    })

    // -> All
    it('Should get all items', function () {
        cy.inserItemWithState([["Angular", "Active"], ["Laravel", "Completed"]])
        cy.filterItems("All")

        cy.get('.todo-list li')
        .should('have.length', 2)
       
    })
    
    // -> Active
    it('Should get active items', function () {
        cy.inserItemWithState([["Angular", "Active"], ["Laravel", "Completed"]])
        cy.filterItems("Active")

        cy.get('.todo-list li')
        .should('have.length', 1)
       
    })

	// Completed
    it('Should get completed items', function () {
        cy.inserItemWithState([["Angular", "Active"], ["Laravel", "Completed"]])
        cy.filterItems("Completed")

        cy.get('.todo-list li')
        .should('have.length', 1)
       
    })

    it('Should delete completed items', function () {
        cy.insertItems(['Javascript','JEE','PHP'])

        cy.get('.todo-list li')
        .eq(1)
        .find(".toggle")
        .check()
        cy.get('.todo-list li')
        .eq(2)
        .find(".toggle")
        .check()

        cy.get(".clear-completed")
        .click({force : true})

        cy.get('.filters')
        .contains("Completed")
        .click()

        cy.get('.todo-list li')
        .should('have.length', 0)       
    })
})