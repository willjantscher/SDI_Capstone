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

    it("logs in with a correct username and password", () => {
        cy.get('input[name="username"]').type("bigCheese")
        cy.get('input[name="passphrase"]').type("password")
        cy.get('input[type="submit"]').click()
        cy.on('window:alert',(txt)=>{
            //Mocha assertions
            expect(txt).to.contains('Welcome Jay Raymond!');
         })    
    })

    it("alerts if user inputted a bad username", () => {
        cy.get('input[name="username"]').type("bigCheesessssss")
        cy.get('input[name="passphrase"]').type("password")
        cy.get('input[type="submit"]').click()
        cy.on('window:alert',(txt)=>{
            //Mocha assertions
            expect(txt).to.contains('Username not found. Please register first.');
         })
    })

    it("alerts if user inputted a bad password", () => {
        cy.get('input[name="username"]').type("bigCheesessssss")
        cy.get('input[name="passphrase"]').type("bad_password")
        cy.get('input[type="submit"]').click()
        cy.on('window:alert',(txt)=>{
            //Mocha assertions
            expect(txt).to.contains('Incorrect password.');
         })
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
    /*
    it("fills out the form", () => {
        cy.get('select').select('Chief of Space Operations (CSO)') 
        cy.get('input[name="username"]').type("btanusi")
        cy.get('input[name="passphrase"]').type("password")
        cy.get('input[name="confirmPassphrase"]').type("password")
        cy.get('input[name="first_name"]').type("Brianna")
        cy.get('input[name="last_name"]').type("Tanusi")
        cy.get('input[type="submit"]').click()
        cy.get('div').should('contain', 'We would be honored if you would join us...')
    })
    */

    it("contains a link to the login page", () => {
        const loginLink = cy.get(".nav-link")
        loginLink.click();
        cy.get('h1').should('contain', 'Login')
    })

  })

  describe('User Profile page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
        cy.get('input[name="username"]').type("bigCheese")
        cy.get('input[name="passphrase"]').type("password")
        cy.get('input[type="submit"]').click()
        cy.visit('http://localhost:3000/authenticated_user/user_profile')
    })

    it("header contains the words Welcome", () => {
        cy.get('h1').should('contain', 'Welcome Jay Raymond!')
    })
    
    
  })