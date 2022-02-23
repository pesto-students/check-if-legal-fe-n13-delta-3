/// <reference types="cypress" />
describe("Load App with/without Login", () => {
	it("Login with user", () => {
		cy.visit("http://localhost:3000/#/login")
		cy.get('[type="radio"]').first()
		cy.get("#login-demo").click()
	})
	it("With Lawyer", () => {
		cy.visit("http://localhost:3000/#/login")
		cy.get('[type="radio"]').check("lawyer", { force: true })
		cy.get("#login-demo").click()
	})
})
