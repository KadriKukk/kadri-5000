const issueTitle = 'This is an issue of type: Task.';

describe('Deleting issue', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains(issueTitle).click();
    });
  });

function clickIconTrashButton() {
  cy.get('[data-testid="icon:trash"]').click();
}

const expectedAmountOfIssuesAfterDeleting = 3;
const modalConfirm ='[data-testid="modal:confirm"]';

    it('Should delete an issue successfully', () => {
      cy.get('[data-testid="modal:issue-details"]').should("be.visible");
        cy.contains (issueTitle);
        cy.wait(5000);cy.get (clickIconTrashButton);
        cy.wait(5000);cy.get(modalConfirm).should('be.visible').within(() => {
            cy.contains ('Are you sure you want to delete this issue?').should('be.visible');
            cy.contains ("Once you delete, it's gone for good").should('be.visible');
            cy.contains("Delete issue").click();
        });

        cy.get(modalConfirm).should('not.exist');

        cy.get('[data-testid="board-list:backlog"]').within( () => {
            cy.contains(issueTitle).should('not.exist');
            cy.get('[data-testid="list-issue"]').should(
              "have.length", 
              expectedAmountOfIssuesAfterDeleting);
        });
      });

    it('Should cancel deleting an issue successfully', () => {
      cy.get('[data-testid="modal:issue-details"]').should("be.visible");
      clickIconTrashButton();
      cy.wait(3000);cy.get(modalConfirm).should('be.visible');
        cy.get(modalConfirm).within( () => {
          cy.contains('Cancel').click();
        })
          cy.get(modalConfirm).should('not.exist');
          cy.get('[data-testid="board-list:backlog"]').within( () => {
            cy.contains(issueTitle).should('exist');
    });
  });
});
