describe('Login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it("header contains the words Login", () => {
        cy.get('h1').should('contain', 'Login')
    })

    it("contains a form with fields username and passphrase", () => {
        expect(cy.get('input[name="username"]')).to.exist;
        expect(cy.get('input[name="passphrase"]')).to.exist;
    })

    it("contains a link to the register page", () => {
        const registerLink = cy.get(".nav-link")
        registerLink.click();
        cy.get('h1').should('contain', 'Register')
    })
  })

  describe('Register page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })

    it("header contains the words Register", () => {
        cy.get('h1').should('contain', 'Register')
    })
    
    it("contains a form with fields unit, username, password, confirm password, first name, last name, and a submit button", () => {
        expect(cy.get('select[name="selected_unit"]')).to.exist;
        expect(cy.get('input[name="username"]')).to.exist;
        expect(cy.get('input[name="passphrase"]')).to.exist;
        expect(cy.get('input[name="confirmPassphrase"]')).to.exist;
        expect(cy.get('input[name="first_name"]')).to.exist;
        expect(cy.get('input[name="last_name"]')).to.exist;
        expect(cy.get('input[value="Submit"]')).to.exist;
    })

    it("contains a link to the login page", () => {
        const loginLink = cy.get(".nav-link")
        loginLink.click();
        cy.get('h1').should('contain', 'Login')
    })

  })