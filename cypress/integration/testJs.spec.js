describe('Test JS',function(){

     // setup these constants to match what TodoMVC does
    let TODO_ITEM_ONE = 'Javascript'
    let TODO_ITEM_TWO = 'JEE'
    let TODO_ITEM_THREE = 'PHP'

    // -> Function for inser items
    Cypress.Commands.add('constItems', (items) => {
        for (var item = 0; item < items.length; item++) {
            cy.get('.new-todo')
            .type(items[item] + "{enter}")
        }  
    })

    // -> Function for inser items with state
    Cypress.Commands.add('inserItem', (list, etat) => {

        for (var iter = 0; iter < list.length; iter++) {
            cy.get('.new-todo')
            .type(list[iter] + "{enter}")
            if (list[iter][1] == "Active") {
                cy.get('.todo-list li')
                .eq(iter)
                .find(".toggle")
                .check()  
            }

            cy.get('.filters')
            .contains(etat)
            .click()
        }
        
    })

    beforeEach(function () {
        cy.visit('http://todomvc.com/examples/jquery/')
    }) 
	
    it('Should add item', function () {
        cy.get('.new-todo')
        .type(TODO_ITEM_ONE+"{enter}")

        cy.get('.todo-list li')
        .should("have.length", 1)
        .and("contain","Javascript")
    })
	
	it('Should delete one item', function () {
        cy.get('.new-todo')
        .type(TODO_ITEM_ONE+"{enter}")

        cy.get('.todo-list li')
        .should("contain","Javascript")
        .find(".destroy")
        .invoke("show")
        .click()
        .should('not.exist')
    })   
	
    it('Should delete all items', function () {
        cy.constItems([TODO_ITEM_ONE,TODO_ITEM_TWO,TODO_ITEM_THREE])

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
        cy.inserItem([["Angular", "Active"], ["Laravel", "Completed"]], "All")

        cy.get('.todo-list li')
        .should('have.length', 2)
       
    })
    
    // -> Active
    it('Should get active items', function () {
        cy.inserItem([["Angular", "Active"], ["Laravel", "Completed"]], "Active")

        cy.get('.todo-list li')
        .should('have.length', 1)
       
    })

	// Completed
    it('Should get completed items', function () {
        cy.inserItem([["Angular", "Active"], ["Laravel", "Completed"]], "Completed")

        cy.get('.todo-list li')
        .should('have.length', 1)
       
    })

    it('Should delete completed items', function () {
        cy.constItems([TODO_ITEM_ONE,TODO_ITEM_TWO,TODO_ITEM_THREE])

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