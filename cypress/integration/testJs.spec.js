describe('Test JS',function(){

    beforeEach(function () {
        cy.visit('http://todomvc.com/examples/jquery/')
    }) 
	
	// 1 - Ajouter un item:
    it('Should add item', function () {
        cy.get('.new-todo')
        .type("Javascript{enter}")
        cy.get('.todo-list li')
        .should("have.length", 1)
        .and("contain","Javascript")
    }  
    )
	
	// 2 - Supprimer un item
	it('Should delete one item', function () {
         cy.get('.new-todo')
        .type("Javascript{enter}")
        cy.get('.todo-list li')
        .should("contain","Javascript")
        .find(".destroy")
        .invoke("show")
        .click()
        .should('not.exist')

    }
    )   
	
	// 3 - Supprimer tous les items
    it('Should delete all items', function () {
        cy.get('.new-todo')
        .type("Javascript{enter}")
        cy.get('.new-todo')
        .type("JEE{enter}")
        cy.get('.new-todo')
        .type("PHP{enter}")

        cy.get('.todo-list li').each(function () {
            cy.get(".destroy").click({
				force : true, multiple: true
			})
        })
        
        cy.get('.todo-list li')
        .should('have.length', 0)
    }
    )
	
	// 4 - Afficher les items par catégorie: 
	// -> all
	it('Should get all items', function () {
        cy.get('.new-todo')
        .type("Javascript{enter}")
        cy.get('.new-todo')
        .type("JEE{enter}")
        cy.get('.todo-list li')
        .eq(1)
        .find(".toggle")
        .check()

        cy.get('.filters')
        .contains("All")
        .click()

        cy.get('.todo-list li')
        .should('have.length', 2)
       
    }
    )
	
	// -> active
    it('Should get active items', function () {
        cy.get('.new-todo')
        .type("Javascript{enter}")
        cy.get('.new-todo')
        .type("JEE{enter}")
        cy.get('.todo-list li')
        .eq(1)
        .find(".toggle")
        .check()

        cy.get('.filters')
        .contains("Active")
        .click()

        cy.get('.todo-list li')
        .should('have.length', 1)
       
    }
    )

	// completed
    it('Should get completed items', function () {
        cy.get('.new-todo')
        .type("Javascript{enter}")
        cy.get('.new-todo')
        .type("JEE{enter}")
        cy.get('.todo-list li')
        .eq(1)
        .find(".toggle")
        .check()

        cy.get('.filters')
        .contains("Completed")
        .click()

        cy.get('.todo-list li')
        .should('have.length', 1)
       
    }
    )

	// 5 - Supprimer les items complétés
    it('Should delete completed items', function () {
        cy.get('.new-todo')
        .type("Javascript{enter}")
        cy.get('.new-todo')
        .type("JEE{enter}")
        cy.get('.new-todo')
        .type("PHP{enter}")

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
    }
    )
	
})