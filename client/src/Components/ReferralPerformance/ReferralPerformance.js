import React, { Component } from "react";
import axios from "axios";

export default class ReferralPerformance extends Component {
  state = {
    loading: true,
    error: "",
    totalUsers: 0,
    performance: [],
    query: "",
    sortBy: "referrals", // "referrals" | "deposit"
    expanded: {}, // { [user_Name]: true/false }
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      this.setState({ loading: true, error: "" });

      // If you use proxy in package.json, axios.get("/admin/referral-performance") is fine.
      const res = await axios.get("/users/admin/referral-performance");

      const totalUsers = res.data?.totalUsers || 0;
      const performance = res.data?.performance || [];

      this.setState({ totalUsers, performance, loading: false });
    } catch (err) {
      this.setState({
        loading: false,
        error:
          err?.response?.data?.error ||
          err?.message ||
          "Failed to load referral performance.",
      });
    }
  };

  toggleExpand = (userName) => {
    this.setState((prev) => ({
      expanded: {
        ...prev.expanded,
        [userName]: !prev.expanded[userName],
      },
    }));
  };

  setSort = (sortBy) => this.setState({ sortBy });

  onSearch = (e) => this.setState({ query: e.target.value });

  getFilteredAndSorted = () => {
    const { performance, query, sortBy } = this.state;
    const q = (query || "").trim().toLowerCase();

    let list = performance;

    if (q) {
      list = list.filter((u) => {
        const name = (u.full_Name || "").toLowerCase();
        const uname = (u.user_Name || "").toLowerCase();
        return name.includes(q) || uname.includes(q);
      });
    }

    // Sorting: Top by referrals (default), tie-break by deposits
    list = [...list].sort((a, b) => {
      if (sortBy === "deposit") {
        if ((b.totalDepositFromReferrals || 0) !== (a.totalDepositFromReferrals || 0)) {
          return (b.totalDepositFromReferrals || 0) - (a.totalDepositFromReferrals || 0);
        }
        return (b.referralCount || 0) - (a.referralCount || 0);
      }

      // sortBy === "referrals"
      if ((b.referralCount || 0) !== (a.referralCount || 0)) {
        return (b.referralCount || 0) - (a.referralCount || 0);
      }
      return (b.totalDepositFromReferrals || 0) - (a.totalDepositFromReferrals || 0);
    });

    return list;
  };

  formatMoney = (n) => {
    const num = Number(n) || 0;
    return `GHC ${num.toFixed(2)}`;
  };

  renderTopStats() {
    const { totalUsers, performance } = this.state;

    const totalReferrals = performance.reduce((sum, u) => sum + (u.referralCount || 0), 0);
    const totalReferralDeposits = performance.reduce((sum, u) => sum + (u.referralDeposits || 0), 0);
    const totalDepositFromReferrals = performance.reduce(
      (sum, u) => sum + (Number(u.totalDepositFromReferrals) || 0),
      0
    );

    return (
      <div className="rp-stats">
        <div className="rp-statCard">
          <div className="rp-statLabel">Total Users</div>
          <div className="rp-statValue">{totalUsers}</div>
        </div>

        <div className="rp-statCard">
          <div className="rp-statLabel">Total Referrals</div>
          <div className="rp-statValue">{totalReferrals}</div>
        </div>

        <div className="rp-statCard">
          <div className="rp-statLabel">Referral Depositors</div>
          <div className="rp-statValue">{totalReferralDeposits}</div>
        </div>

        <div className="rp-statCard">
          <div className="rp-statLabel">Deposits From Referrals</div>
          <div className="rp-statValue">{this.formatMoney(totalDepositFromReferrals)}</div>
        </div>
      </div>
    );
  }

  renderRow = (u, index) => {
    const { expanded } = this.state;
    const isOpen = !!expanded[u.user_Name];
    const referrals = u.referrals || [];

    return (
      <div key={u.user_Name || index} className={`rp-row ${isOpen ? "open" : ""}`}>
        <div className="rp-rowMain" onClick={() => this.toggleExpand(u.user_Name)} role="button">
          <div className="rp-rank">{index + 1}</div>

          <div className="rp-user">
            <div className="rp-userTop">
              <span className="rp-userName">{u.full_Name || "Unknown Name"}</span>
              <span className="rp-userHandle">@{u.user_Name || "unknown"}</span>
            </div>

            <div className="rp-badges">
              <span className="rp-badge rp-badgeBlue">👥 Referrals: {u.referralCount || 0}</span>
              <span className="rp-badge rp-badgeGreen">✅ Depositors: {u.referralDeposits || 0}</span>
              <span className="rp-badge rp-badgeGold">💰 {this.formatMoney(u.totalDepositFromReferrals)}</span>
            </div>
          </div>

          <div className="rp-expand">
            <span className={`rp-chevron ${isOpen ? "up" : ""}`}>▾</span>
          </div>
        </div>

        {isOpen && (
          <div className="rp-rowDetails">
            {referrals.length === 0 ? (
              <div className="rp-empty">
                <div className="rp-emptyIcon">🫥</div>
                <div>
                  <div className="rp-emptyTitle">No referrals yet</div>
                  <div className="rp-emptyText">This user has not referred anyone.</div>
                </div>
              </div>
            ) : (
              <div className="rp-tableWrap">
                <div className="rp-tableHeader">
                  <div>Referred User</div>
                  <div>Status</div>
                  <div>Total Deposit</div>
                </div>

                {referrals.map((r, i) => (
                  <div className="rp-tableRow" key={`${u.user_Name}-${r.user_Name}-${i}`}>
                    <div className="rp-refUser">
                      <div className="rp-refName">{r.full_Name || "—"}</div>
                      <div className="rp-refHandle">@{r.user_Name || "—"}</div>
                    </div>

                    <div>
                      {r.hasDeposit ? (
                        <span className="rp-pill rp-pillOk">✅ Deposited</span>
                      ) : (
                        <span className="rp-pill rp-pillNo">⏳ No deposit</span>
                      )}
                    </div>

                    <div className="rp-money">{this.formatMoney(r.totalDeposit)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { loading, error, query, sortBy } = this.state;
    const list = this.getFilteredAndSorted();

    return (
      <div className="rp-page">
        <style>{css}</style>

        <div className="rp-container">
          <div className="rp-header">
            <div>
              <div className="rp-title">Referral Performance</div>
              <div className="rp-subtitle">Leaderboard view — referrals + deposit activity</div>
            </div>

            <button className="rp-refresh" onClick={this.fetchData}>
              🔄 Refresh
            </button>
          </div>

          {this.renderTopStats()}

          <div className="rp-controls">
            <div className="rp-search">
              <span className="rp-searchIcon">🔎</span>
              <input
                value={query}
                onChange={this.onSearch}
                placeholder="Search by name or username..."
              />
            </div>

            <div className="rp-sort">
              <button
                className={`rp-sortBtn ${sortBy === "referrals" ? "active" : ""}`}
                onClick={() => this.setSort("referrals")}
              >
                👥 Sort: Referrals
              </button>
              <button
                className={`rp-sortBtn ${sortBy === "deposit" ? "active" : ""}`}
                onClick={() => this.setSort("deposit")}
              >
                💰 Sort: Deposits
              </button>
            </div>
          </div>

          {loading && (
            <div className="rp-loading">
              <div className="rp-spinner" />
              <div>
                <div className="rp-loadingTitle">Loading performance…</div>
                <div className="rp-loadingText">Fetching your referral/deposit stats.</div>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="rp-error">
              <div className="rp-errorIcon">⚠️</div>
              <div>
                <div className="rp-errorTitle">Could not load data</div>
                <div className="rp-errorText">{error}</div>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="rp-list">
              {list.length === 0 ? (
                <div className="rp-empty">
                  <div className="rp-emptyIcon">🫥</div>
                  <div>
                    <div className="rp-emptyTitle">No results</div>
                    <div className="rp-emptyText">Try searching with a different name.</div>
                  </div>
                </div>
              ) : (
                list.map(this.renderRow)
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const css = `
  .rp-page{
    min-height:100vh;
    background: radial-gradient(1200px 600px at 20% 0%, rgba(90,160,255,.18), transparent 60%),
                radial-gradient(900px 500px at 85% 10%, rgba(255,200,120,.10), transparent 60%),
                #070A12;
    color:#EAF0FF;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
    padding: 22px 12px;
  }
  .rp-container{
    max-width: 980px;
    margin: 0 auto;
  }
  .rp-header{
    display:flex;
    align-items:flex-end;
    justify-content:space-between;
    gap: 14px;
    margin-bottom: 16px;
  }
  .rp-title{
    font-size: 24px;
    font-weight: 800;
    letter-spacing: .2px;
  }
  .rp-subtitle{
    margin-top: 4px;
    color: rgba(234,240,255,.72);
    font-size: 13px;
  }
  .rp-refresh{
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.06);
    color:#EAF0FF;
    padding: 10px 12px;
    border-radius: 12px;
    cursor:pointer;
    transition: transform .15s ease, background .15s ease, border .15s ease;
    user-select:none;
  }
  .rp-refresh:hover{ transform: translateY(-1px); background: rgba(255,255,255,.09); border-color: rgba(255,255,255,.18); }

  .rp-stats{
    display:grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 12px;
  }
  @media(max-width: 860px){
    .rp-stats{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  .rp-statCard{
    border: 1px solid rgba(255,255,255,.10);
    background: rgba(255,255,255,.05);
    border-radius: 16px;
    padding: 12px 12px;
    box-shadow: 0 14px 30px rgba(0,0,0,.35);
  }
  .rp-statLabel{
    font-size: 12px;
    color: rgba(234,240,255,.70);
  }
  .rp-statValue{
    margin-top: 4px;
    font-size: 18px;
    font-weight: 800;
  }

  .rp-controls{
    display:flex;
    gap: 10px;
    justify-content: space-between;
    align-items:center;
    margin: 10px 0 14px;
    flex-wrap: wrap;
  }
  .rp-search{
    flex: 1;
    min-width: 240px;
    display:flex;
    align-items:center;
    gap: 10px;
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.05);
    border-radius: 14px;
    padding: 10px 12px;
  }
  .rp-searchIcon{ opacity:.8; }
  .rp-search input{
    width:100%;
    background: transparent;
    border:none;
    outline:none;
    color:#EAF0FF;
    font-size: 14px;
  }
  .rp-search input::placeholder{ color: rgba(234,240,255,.55); }

  .rp-sort{
    display:flex;
    gap: 8px;
  }
  .rp-sortBtn{
    border: 1px solid rgba(255,255,255,.12);
    background: rgba(255,255,255,.05);
    color:#EAF0FF;
    padding: 10px 12px;
    border-radius: 14px;
    cursor:pointer;
    transition: transform .15s ease, background .15s ease, border .15s ease;
  }
  .rp-sortBtn:hover{ transform: translateY(-1px); background: rgba(255,255,255,.08); }
  .rp-sortBtn.active{
    background: rgba(90,160,255,.18);
    border-color: rgba(90,160,255,.35);
  }

  .rp-loading, .rp-error, .rp-empty{
    border: 1px solid rgba(255,255,255,.10);
    background: rgba(255,255,255,.05);
    border-radius: 18px;
    padding: 16px;
    display:flex;
    gap: 12px;
    align-items: center;
    box-shadow: 0 14px 30px rgba(0,0,0,.35);
  }
  .rp-error{ border-color: rgba(255,90,90,.25); }
  .rp-errorIcon{ font-size: 18px; }
  .rp-errorTitle{ font-weight: 800; }
  .rp-errorText{ margin-top: 2px; color: rgba(234,240,255,.70); font-size: 13px; }

  .rp-emptyIcon{ font-size: 18px; }
  .rp-emptyTitle{ font-weight: 800; }
  .rp-emptyText{ margin-top: 2px; color: rgba(234,240,255,.70); font-size: 13px; }

  .rp-spinner{
    width: 16px;
    height: 16px;
    border-radius: 999px;
    border: 2px solid rgba(234,240,255,.22);
    border-top-color: rgba(234,240,255,.85);
    animation: spin .75s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .rp-loadingTitle{ font-weight: 800; }
  .rp-loadingText{ margin-top: 2px; color: rgba(234,240,255,.70); font-size: 13px; }

  .rp-list{
    display:flex;
    flex-direction: column;
    gap: 10px;
  }

  .rp-row{
    border: 1px solid rgba(255,255,255,.10);
    background: rgba(255,255,255,.04);
    border-radius: 18px;
    overflow:hidden;
    box-shadow: 0 14px 30px rgba(0,0,0,.35);
    transition: border .15s ease, background .15s ease, transform .15s ease;
  }
  .rp-row:hover{
    border-color: rgba(255,255,255,.16);
    background: rgba(255,255,255,.055);
    transform: translateY(-1px);
  }

  .rp-rowMain{
    padding: 12px 12px;
    display:flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    user-select:none;
  }
  .rp-rank{
    width: 36px;
    height: 36px;
    border-radius: 12px;
    display:flex;
    align-items:center;
    justify-content:center;
    background: rgba(90,160,255,.14);
    border: 1px solid rgba(90,160,255,.25);
    font-weight: 900;
  }

  .rp-user{ flex: 1; min-width: 0; }
  .rp-userTop{
    display:flex;
    align-items:baseline;
    gap: 10px;
    flex-wrap: wrap;
  }
  .rp-userName{
    font-weight: 900;
    font-size: 15px;
  }
  .rp-userHandle{
    color: rgba(234,240,255,.65);
    font-size: 13px;
  }
  .rp-badges{
    display:flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 6px;
  }
  .rp-badge{
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.10);
    background: rgba(255,255,255,.05);
    color:#EAF0FF;
  }
  .rp-badgeBlue{
    background: rgba(90,160,255,.14);
    border-color: rgba(90,160,255,.22);
  }
  .rp-badgeGreen{
    background: rgba(90,255,170,.10);
    border-color: rgba(90,255,170,.18);
  }
  .rp-badgeGold{
    background: rgba(255,200,120,.12);
    border-color: rgba(255,200,120,.20);
  }

  .rp-expand{
    width: 36px;
    display:flex;
    justify-content:flex-end;
  }
  .rp-chevron{
    font-size: 18px;
    opacity: .8;
    transition: transform .15s ease;
  }
  .rp-chevron.up{ transform: rotate(180deg); }

  .rp-rowDetails{
    border-top: 1px solid rgba(255,255,255,.08);
    padding: 12px 12px 14px;
  }

  .rp-tableWrap{
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 14px;
    overflow:hidden;
    background: rgba(0,0,0,.22);
  }
  .rp-tableHeader{
    display:grid;
    grid-template-columns: 1.4fr .7fr .7fr;
    gap: 10px;
    padding: 10px 12px;
    font-size: 12px;
    color: rgba(234,240,255,.70);
    border-bottom: 1px solid rgba(255,255,255,.08);
  }
  .rp-tableRow{
    display:grid;
    grid-template-columns: 1.4fr .7fr .7fr;
    gap: 10px;
    padding: 10px 12px;
    border-bottom: 1px solid rgba(255,255,255,.06);
    align-items:center;
  }
  .rp-tableRow:last-child{ border-bottom:none; }

  .rp-refUser{ min-width: 0; }
  .rp-refName{ font-weight: 800; }
  .rp-refHandle{ color: rgba(234,240,255,.65); font-size: 12px; margin-top: 2px; }

  .rp-pill{
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.10);
    display:inline-flex;
    align-items:center;
    gap: 6px;
    white-space: nowrap;
  }
  .rp-pillOk{
    background: rgba(90,255,170,.10);
    border-color: rgba(90,255,170,.20);
  }
  .rp-pillNo{
    background: rgba(255,255,255,.06);
    border-color: rgba(255,255,255,.10);
    color: rgba(234,240,255,.75);
  }

  .rp-money{
    font-weight: 900;
    text-align: right;
  }

  @media(max-width: 680px){
    .rp-tableHeader, .rp-tableRow{
      grid-template-columns: 1fr .9fr;
    }
    .rp-money{ text-align:left; }
    .rp-tableHeader div:last-child,
    .rp-tableRow div:last-child{
      display:none;
    }
  }
`;
