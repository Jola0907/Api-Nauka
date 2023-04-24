describe('API tests', () => {

    it('response code should be 200', () => {
      cy.request('https://httpbin.org').then(response => {
        const status = response.status;
  
        assert.equal(200, status);
      })
    })
  })

  it('DELETE method', ()=> {  //sprawdzam metode DELETE
    cy.request('DELETE','https://httpbin.org')
    cy.get('@comments').should((response) => {
        expect(response.body).to.have.length(500)
        expect(response).to.have.property('headers')
        expect(response).to.have.property('duration')
      })

  })

it('GET in API test', () => {  //sprawdzam czy API DZIAŁA
    cy.request({ method: 'GET', url:'https://httpbin.org'})
    .as('requestAPI');
    cy.get('@requestAPI').Its('status').should('eq', 200) 
    cy.log('request good sent');  }) 

it('BODY is not empty', () => {  // sprawdzam czy body nie jest pustes
    cy.get('@requestAPI').Its('body').should('not.be.empty');
    cy.log('Request body is not empty');
})

it('Response with Body', () =>{ // z response egzekwujemy boddy
    cy.get('@requestAPI').should((response) => {
    cy.log('Response was: ' + JSON.stringify(response.body));

    }

)} )
it.only('POST add new anything notes: NOTES', () => {
    cy.request({method: 'POST', url: 'https://httpbin.org',
    body:{'anything': 'note first'}
    }).as('requestAPI');
    cy.log('Request good sent');

})

it.only('POST WE CHECK IS BODY NOT EMPTY', () => { // CZY BODY W POST JEST PUSTE??
    cy.get('@requestAPI').Its('body').should('not.be.empty');
    cy.log('Request body is not empty');

})

it.only('POST WE CHECK WELL ADDED', () =>{ // sprawdzamy czy body ma nowy element notatki w anything
    cy.get('@requestAPI').then((response)
    cy.wrap(JSON.stringify(response.body)).should('include', 'note first'))})//WRAP CAJPRESUJE


it.only('DELETE new NOTE', () => { // usuwanie tego co dodaliśmy, utwożenie idNote
    let noteEId; 
    cy.request({method: 'POST', url:'https://httpbin.org',
            body: {'anything': 'note first'}}).as('testData');
        
        cy.get('@testData').its('status').should('eq', 200);
        cy.get('@testData').then((response) => {
        noteId = response.body.length
        cy.log('NOTE was created with id = ' + noteId);
        })
        cy.log('Test data created correctly.')
})
        cy.then(()=>{
        const noteId = Cypress.env('noteId');
        cy.request({
         method: 'DELETE',
            url:`https://httpbin.org${noteId}`,}).as('@requestAPI');

            cy.get('requestAPI').its('status').should('eq', 200);

})

it.only('DELETE', () => { 
    let noteEId; 
    cy.request({method: 'POST', url:'https://httpbin.org',
            body: {'anything': 'note first'}}).as('testData');

        cy.get('@requestAPI').then((response) => {
            cy.wrap(JSON.stringify(response.body))
                .should('anything', 'note first')})})
        


        
        
 

