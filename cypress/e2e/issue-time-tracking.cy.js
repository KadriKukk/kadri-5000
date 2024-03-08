describe('Issue create', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', 'https://jira.ivorreic.com/project').then((url) => {
      cy.visit(url + '/board?modal-issue-create=true');
    });
  });
  const modalTracking = '[data-testid="modal:tracking"]';
  const modalIssueDetails = '[data-testid="modal:issue-details"]';
  const boardListBacklog = '[data-testid="board-list:backlog"]';
  const iconStopwatch = '[data-testid="icon:stopwatch"]';
  const timeSpent = 'Time spent (hours)';
  const timeRemaining = 'Time remaining (hours)';
  const originalEstimateHours = 'Original Estimate (hours)';
it('User can add, edit and remove time estimation to issue',() => {
  cy.wait(4000);
  //create issue
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get('.ql-editor').type('My_task_description');
    cy.get('[data-testid="select:reporterId"]').click('bottomRight');
    cy.get('[data-testid="select-option:Pickle Rick"]').click();
    cy.get('input[name="title"]').type('hi');
    cy.get('input[name="title"]').should('have.value','hi');
    cy.get('button[type="submit"]').click().wait(20000);
    });
  cy.reload();
    cy.wait(30000);
  //add time estimation
    cy.get(boardListBacklog)
        .contains('hi')
        .click();
    cy.get(modalIssueDetails)
      cy.contains('No time logged')
      cy.contains(originalEstimateHours)
        .next('div')
        .click()
        .type('[value="10"]')
      cy.contains(originalEstimateHours)
        .click();
      cy.get('[data-testid="icon:close"]')
        .should('be.visible')
        .click();
      cy.wait(20000);
    cy.get(boardListBacklog)
        .contains('hi')
        .click();
    cy.get(modalIssueDetails)
        .contains('10h estimated');
  //edit 
    cy.contains(originalEstimateHours)
        .next('div')
        .find('input')
        .clear()
        .type('[value="20"]')
    cy.contains(originalEstimateHours)
        .click();
      cy.get('[data-testid="icon:close"]')
        .should('be.visible')
        .click();
    cy.get(boardListBacklog)
        .contains('hi')
        .click();
    cy.get(modalIssueDetails)
      cy.contains('20h estimated');
  //remove
      cy.contains(originalEstimateHours)
        .next('div')
        .find('input')
        .clear();
      cy.get('[data-testid="icon:close"]')
        .should('be.visible')
        .click();
    cy.wait(20000);
    cy.get(boardListBacklog)
        .contains('hi')
        .click();
    cy.get(modalIssueDetails)
      cy.contains('No time logged');
      cy.contains(originalEstimateHours)
      cy.get('input[placeholder="Number"]')
        .should('be.visible')
    });

it('User logs spent time to recently created issue and then removes it',() => {
  cy.wait(40000);
  //create issue
  cy.get('[data-testid="modal:issue-create"]').within(() => {
    cy.get('.ql-editor').type('My_task_description');
    cy.get('[data-testid="select:reporterId"]').click('bottomRight');
    cy.get('[data-testid="select-option:Pickle Rick"]').click();
    cy.get('input[name="title"]').type('hi');
    cy.get('input[name="title"]').should('have.value','hi');
    cy.get('button[type="submit"]').click().wait(30000);
    });
  cy.reload();
    cy.wait(2000);
  //log time
    cy.get(boardListBacklog)
        .contains('hi')
        .click();
    cy.get(modalIssueDetails)   
    cy.get(iconStopwatch)
        .click()
    cy.get(modalTracking).within(() => {
      cy.contains(timeSpent)
        .next('div')
        .find('input')
        .type('[value="2"]')
        .trigger('mouseover')
        .trigger('click');
      cy.contains(timeRemaining)
        .next('div')
        .find('input')
        .type('[value="5"]')
        .trigger('mouseover')
        .trigger('click');
      cy.contains('button','Done')
        .should('be.visible')
        .click();
        });
    cy.get(modalIssueDetails)
        .contains('Time Tracking')
      cy.get('No time logged').should('not.exist')
      cy.contains('2h logged').should('be.visible')
      cy.contains('5h remaining').should('be.visible')
  //remove logged time
    cy.get(iconStopwatch)
        .next('div')
        .click();
    cy.get(modalTracking).within(() => {
      cy.contains(timeSpent)
        .next('div')
        .find('input')
        .clear();
      cy.contains(timeRemaining)
        .next('div')
        .find('input')
        .clear();
      cy.contains('button','Done')
        .should('be.visible')
        .click();
        });
    cy.get(modalTracking)
        .should('not.exist')
    cy.get(modalIssueDetails)
        .contains('No time logged')
    });
});