describe('Issue time estimation creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

it('User can add time estimation to issue')

//Adding estimation.
//Asserting that the estimation is added and visible.

it('User can update time estimation to issue')

//Editing the estimation.
//Asserting that the updated value is visible.

it('User can remove time estimation to issue')

//Removing the estimation.
//Asserting that the value is removed.

it('User logs spent time to recently created issue')

it('User removes logged spent time from recently created issue')

})