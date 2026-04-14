import React, { Component } from "react";
import "./AutoMiningReactivationFrontend.css";

class AutoMiningReactivationFrontend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      steps: [
        {
          no: "01",
          title: "Go to Home Dashboard",
          text: "After cashout, return to your home dashboard to reactivate your mining plan.",
          icon: "🏠",
        },
        {
          no: "02",
          title: "Click Make Deposit",
          text: "Click the Make Deposit button to start updating your mining plan again.",
          icon: "💳",
        },
        {
          no: "03",
          title: "Enter the Same Amount",
          text: "Enter the same amount you already have in the system so your current plan matches correctly.",
          icon: "💰",
        },
        {
          no: "04",
          title: "Click I Have Paid",
          text: "When you get to the page where the amount is shown, click I Have Paid / Confirm Payment. Since the money is already in the system, your plan will update automatically.",
          icon: "✅",
        },
      ],
      checklist: [
        "Go to Home Dashboard",
        "Click Make Deposit",
        "Enter the same amount",
        "Click I Have Paid / Confirm Payment",
        "Your mining plan updates automatically",
      ],
      infoCards: [
        {
          title: "Same Amount",
          text: "Use the same amount already available in the system.",
        },
        {
          title: "No New Payment",
          text: "The user does not need to send new money again at this stage.",
        },
        {
          title: "Auto Update",
          text: "Confirming payment will reactivate and update the plan automatically.",
        },
      ],
    };
  }

  renderInfoCards() {
    const { infoCards } = this.state;

    return infoCards.map((card) => (
      <div className="glass-panel auto-mining-info-card" key={card.title}>
        <div className="auto-mining-mini-title">{card.title}</div>
        <div className="auto-mining-mini-text">{card.text}</div>
      </div>
    ));
  }

  renderSteps() {
    const { steps } = this.state;  

    return steps.map((step) => (
      <div key={step.no} className="step-card glass-panel auto-mining-step">
        <div className="auto-mining-step-head">
          <div className="step-orb panel-orb-lg">{step.icon}</div>
          <div className="auto-mining-step-number">{step.no}</div>
        </div>

        <div className="auto-mining-step-title">{step.title}</div>
        <div className="auto-mining-step-text">{step.text}</div>
        <div className="auto-mining-step-line" />
        <div className="auto-mining-step-link">Complete this step →</div>
      </div>
    ));
  }

  renderChecklist() {
    const { checklist } = this.state;

    return checklist.map((item) => (
      <div className="auto-mining-checklist-item" key={item}>
        <span className="auto-mining-check-dot" />
        <span className="auto-mining-check-text">{item}</span>
      </div>
    ));
  }

  render() {
     const { user_Name} = this.props;
    return (
      <div className="auto-mining-root auto-mining-page">
        <div className="scene-grid auto-mining-scene-grid" />
        <div className="hero-bg-cyan" />
        <div className="hero-bg-indigo" />

        <div className="auto-mining-container">
          <div className="auto-mining-grid">
            <div className="auto-mining-left">
              <div className="auto-mining-badge">
                <span className="auto-mining-pulse" />
                Auto Mining Reactivation Guide
              </div>

              <div className="auto-mining-title">
                Hello! {user_Name}, After <span className="cyan">Cashout</span>,
                <br />
                reactivate your mining plan{" "}
                <span className="indigo">in 4 simple steps</span>
              </div>

              <div className="auto-mining-text">
                Some users think Auto Mining will continue automatically after
                cashout. It does not. To continue mining again, the user should
                go to the Home Dashboard, click Make Deposit, enter the same
                amount already in the system, then click I Have Paid / Confirm
                Payment. Because the money is already in the system, the mining
                plan will update automatically.
              </div>

               <div className="auto-mining-actions">
                <button
                  className="auto-mining-cta-button auto-mining-primary-button"
                  type="button"
                >
                  Go to Dashboard
                </button>

                <button className="auto-mining-secondary-button" type="button">
                  View Deposit Steps
                </button>
              </div>

              <div className="auto-mining-info-grid">
                {this.renderInfoCards()}
              </div>
            </div>

            <div className="hero-shell">
              <div className="tilt-stage auto-mining-tilt-wrap">
                <div className="floor-glow auto-mining-floor-glow" />

                <div className="hero-3d auto-mining-hero-wrap">
                  <div className="glow-ring auto-mining-glow-ring" />

                  <div className="glass-panel auto-mining-panel">
                    <div className="depth-1 auto-mining-topbar">
                      <div className="auto-mining-topbar-copy">
                        <div className="auto-mining-top-label">
                          Live Instruction
                        </div>
                        <div className="auto-mining-top-title">
                          Reactivate After Cashout
                        </div>
                      </div>

                      <div className="auto-mining-ready">READY</div>
                    </div>

                    <div className="depth-2 auto-mining-card">
                      <div className="auto-mining-card-row">
                        <div className="auto-mining-card-copy">
                          <div className="auto-mining-card-label">
                            Current Flow
                          </div>
                          <div className="auto-mining-card-title">
                            Home → Dashboard → Deposit
                          </div>
                        </div>

                        <div className="step-orb panel-orb-lg">⚙️</div>
                      </div>

                      <div className="auto-mining-progress-wrap">
                        <div className="auto-mining-progress-meta">
                          <span>Plan Reactivation</span>
                          <span>100%</span>
                        </div>

                        <div className="auto-mining-progress neon-line">
                          <div className="auto-mining-progress-bar" />
                        </div>
                      </div>

                      <div className="auto-mining-metrics">
                        <div className="auto-mining-metric">
                          <div className="auto-mining-metric-label">Button</div>
                          <div className="auto-mining-metric-value">
                            Make Deposit
                          </div>
                        </div>

                        <div className="auto-mining-metric">
                          <div className="auto-mining-metric-label">Action</div>
                          <div className="auto-mining-metric-value">
                            Confirm Payment
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="depth-3 auto-mining-note">
                      <div className="auto-mining-note-wrap">
                        <div className="step-orb panel-orb-md">✅</div>

                        <div className="auto-mining-note-text">
                          Users do not need to send new money again here. They
                          only need to confirm the same amount already inside the
                          system so the mining plan can reactivate automatically.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="auto-mining-section">
            <div className="auto-mining-section-head">
              <div>
                <div className="auto-mining-section-kicker">Step-by-step</div>
                <div className="auto-mining-section-title">
                  How users should update their mining plan
                </div>
              </div>
            </div>

            <div className="auto-mining-steps-grid">{this.renderSteps()}</div>
          </div>

        </div>
      </div>
    );
  }
}

export default AutoMiningReactivationFrontend;