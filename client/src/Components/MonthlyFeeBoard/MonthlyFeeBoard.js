import React, { Component } from "react";
import axios from "axios";
import "./MonthlyFeeBoard.css";

class MonthlyFeeBoard extends Component {
  state = {
    loading: true,
    fees: [],
    error: "",
    selectedIndex: 0,
  };

  componentDidMount() {
    const userId = String(this.props.userId || "").trim();
    if (!userId) {
      this.setState({ loading: false, error: "User ID missing" });
      return;
    }

    axios
      .get(`/users/monthlyfee/my/${userId}`)
      .then((res) => {
        const fees = res.data || [];
        this.setState({
          fees,
          loading: false,
          selectedIndex: 0,
        });
      })
      .catch((err) =>
        this.setState({
          error: err?.response?.data?.msg || "Failed to load monthly fee",
          loading: false,
        })
      );
  }

  monthName = (m) => {
    const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return names[m - 1] || m;
  };

  fmtMoney = (n) => {
    const val = Number(n || 0);
    return val.toFixed(2);
  };

  pickFee = (idx) => {
    this.setState({ selectedIndex: idx });
  };

  render() {
    const { loading, fees, error, selectedIndex } = this.state;

    const active = fees && fees.length > 0 ? (fees[selectedIndex] || fees[0]) : null;

    const totalWithdrawn = active ? Number(active.totalWithdrawn || 0) : 0;
    const miningCost10 = active ? Number(active.miningCost10 || 0) : 0;
    const payableFee = active ? Number(active.payableFee || 0) : 0;

    const statusText = active ? (active.paid ? "PAID" : "UNPAID") : "—";

    return (
      <div className="mfWrap">
        {/* Header */}
        <div className="mfHeader">
          <div className="mfHeaderLeft">
            <div className="mfIconPulse">
              <i className="fas fa-microchip"></i>
            </div>

            <div>
              <h3 className="mfTitle">Mining Service Fee</h3>
              <p className="mfSub">
                This monthly service fee keeps withdrawals fast, secure, and automated —
                covering mining operations, network processing, and 24/7 system monitoring.
              </p>
            </div>
          </div>

          <div className={`mfStatus ${active && active.paid ? "paid" : "unpaid"}`}>
            <i className={`fas ${active && active.paid ? "fa-check-circle" : "fa-exclamation-triangle"}`}></i>
            <span>{statusText}</span>
          </div>
        </div>

        {/* Rules */}
        <div className="mfRuleBar">
          <div className="mfRuleItem">
            <i className="fas fa-percentage"></i>
            <span>Mining Percent:</span>
            <b>10%</b>
          </div>

          <div className="mfRuleDot"></div>

          <div className="mfRuleItem">
            <i className="fas fa-coins"></i>
            <span>You Pay:</span>
            <b>15% of the 10%</b>
            <em>(= 1.5% total)</em>
          </div>

          <div className="mfRuleRight">
            <i className="fas fa-shield-alt"></i>
            <span>Secure & Transparent</span>
          </div>
        </div>

        {/* Loading / Error / Empty */}
        {loading && <div className="mfBox">Loading your mining fee details…</div>}
        {error && <div className="mfError">{error}</div>}

        {!loading && !error && fees.length === 0 && (
          <div className="mfBox">
            <div className="mfEmptyTop">
              <i className="fas fa-info-circle"></i>
              <div>
                <b>No monthly fee record yet</b>
                <p>Your monthly fee will appear after your first withdrawal.</p>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        {!loading && !error && fees.length > 0 && (
          <>
            {/* Summary cards */}
            <div className="mfCards">
              <div className="mfCard">
                <div className="mfCardTop">
                  <i className="fas fa-wallet"></i>
                  <span>Total Withdrawn</span>
                </div>
                <div className="mfCardValue">GHC {this.fmtMoney(totalWithdrawn)}</div>
                <div className="mfCardHint">Monthly withdrawal volume</div>
              </div>

              <div className="mfCard">
                <div className="mfCardTop">
                  <i className="fas fa-industry"></i>
                  <span>Mining Profit  (10%)</span>
                </div>
                <div className="mfCardValue">GHC {this.fmtMoney(miningCost10)}</div>
                <div className="mfCardHint">Mining Profit for the month</div>
              </div>

              <div className="mfCard mfCardHighlight">
                <div className="mfCardTop">
                  <i className="fas fa-receipt"></i>
                  <span>Payable services Fee</span>
                </div>
                <div className="mfCardValue">GHC {this.fmtMoney(payableFee)}</div>
                <div className="mfCardHint">
                  15% of mining profit (1.5% total)
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="mfTableWrap">
              <div className="mfTableHead">
                <div className="mfTableHeadLeft">
                  <i className="fas fa-calendar-alt"></i>
                  <b>Monthly Records</b>
                  <span className="mfSmall">Tap a row to preview summary above</span>
                </div>

                <div className="mfTip">
                  <i className="fas fa-bolt"></i>
                  <span>Auto-updated after every withdrawal</span>
                </div>
              </div>

              <div className="mfTableScroll">
                <table className="mfTable">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Total Withdrawn</th>
                      <th>Mining Profit (10%)</th>
                      <th>Payable (15% of 10%)</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {fees.map((f, idx) => {
                      const isActive = idx === selectedIndex;
                      const paid = !!f.paid;

                      return (
                        <tr
                          key={f._id}
                          className={isActive ? "mfRowActive" : ""}
                          onClick={() => this.pickFee(idx)}
                          title="Click to preview summary"
                        >
                          <td>
                            <div className="mfMonth">
                              <i className="fas fa-clock"></i>
                              <span>{this.monthName(f.month)} {f.year}</span>
                            </div>
                          </td>

                          <td>GHC {this.fmtMoney(f.totalWithdrawn)}</td>
                          <td>GHC {this.fmtMoney(f.miningCost10)}</td>
                          <td className="mfPay">GHC {this.fmtMoney(f.payableFee)}</td>

                          <td>
                            <span className={`mfBadge ${paid ? "paid" : "unpaid"}`}>
                              <i className={`fas ${paid ? "fa-check" : "fa-times"}`}></i>
                              {paid ? "PAID" : "UNPAID"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mining message */}
              <div className="mfMessage">
                <div className="mfMsgLeft">
                  <div className="mfMsgIcon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <div>
                    <b>Why this fee exists</b>
                    <p>
                      We maintain mining infrastructure, secure servers, automatic processing,
                      and continuous monitoring to keep your withdrawals smooth and reliable.
                    </p>
                  </div>
                </div>

                <div className="mfMsgRight">
                  <div className="mfMini">
                    <i className="fas fa-headset"></i>
                    <span>24/7 Support</span>
                  </div>
                  <div className="mfMini">
                    <i className="fas fa-lock"></i>
                    <span>Security Checks</span>
                  </div>
                  <div className="mfMini">
                    <i className="fas fa-sync-alt"></i>
                    <span>Auto Updates</span>
                  </div>
                </div>
              </div>

              {/* Notice */}
              {active && !active.paid && (
                <div className="mfNotice">
                  <i className="fas fa-info-circle"></i>
                  <div>
                    <b>Action Required</b>
                    <p>
                      Your current month fee is <b>UNPAID</b>. Please complete payment to keep mining withdrawals active.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default MonthlyFeeBoard;
