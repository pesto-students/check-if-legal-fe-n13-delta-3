/// <reference types="cypress" />
describe("Registration of Lawyer", () => {
	it("login Lawyer", () => {
		cy.visit("http://localhost:3000/#/login")
		cy.get('[type="radio"]').check("lawyer", { force: true })
		cy.get("#login-demo").click()
		cy.url()
			.should("include", "lawyer/register")
			.then(() => {
				cy.get("input[type=name]").type("janahsasjdakhjsd")
				cy.get("input[type=phone]").type("70426515231")
				cy.get("#field-4").type("asfjhasbhfashfhasjhgashkgfkahsfkha")
				cy.get("#field-5").type("asfjhasbhfashfhasjhasnasdgashkgfkahsfkha")
				cy.get("form").submit()
			})
	})
})
describe("Status of Lawyer", () => {
	it("login Lawyer", () => {
		cy.visit("http://localhost:3000/#/login")
		cy.get('[type="radio"]').check("lawyer", { force: true })
		cy.get("#login-demo").click()
		cy.url()
			.should("include", "lawyer/status")
			.then(() => {
				const filepath = "images/test.png"
				cy.get('input[type="file"]').attachFile(filepath)
				cy.get("form").submit()
			})
	})
})
