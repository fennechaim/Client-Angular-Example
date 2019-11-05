import {element, by, browser} from "protractor";

export class PolicyProposalsPage{
  private get policyProposalsComponent(){
    return element(by.css("policy-proposals"));
  }

  private get policyProposals(){
    return this.policyProposalsComponent.all(by.css('policy-proposal'));
  }

  private  getPolicyProposalButton(proposal){
    return proposal.element(by.css('button.submit'));
  }

  isPageReady(){
    return this.policyProposalsComponent.isPresent();
  }
  selectPolicyProposal(index: number) {
   let firstProposal = this.policyProposals.get(index);
    let acceptPolicyButton = this.getPolicyProposalButton(firstProposal);
    acceptPolicyButton.click();
  }
}
