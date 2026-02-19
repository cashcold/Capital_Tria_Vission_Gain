// AutoMiningStatus.jsx
import React, { Component } from "react";
import "./AutoMiningStatus.css";

// ✅ PRO ICONS
import { GiMining } from "react-icons/gi";
import { FaLock, FaBolt } from "react-icons/fa";
import {
  MdOutlineSpeed,
  MdOutlineTimer,
  MdOutlineSync,
  MdOutlineVerified,
  MdOutlineWarningAmber,
  MdOutlineCloudUpload,
} from "react-icons/md";

/**
 * UPDATED:
 * ✅ Removed: Today’s Earnings, Pending Credit, View Mining History, Stop Auto Mining
 * ✅ Added: "Activation In Progress" mining details (syncing, verification, nodes, ETA, steps)
 *
 * Usage:
 * <AutoMiningStatus autoActive={this.state.user.autoMining === true} isProvisioning={this.state.user.autoProvisioning === true} />
 *
 * If you don't have isProvisioning in DB yet, just pass false or omit it.
 */
export default class AutoMiningStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hashRate: 0,
      uptimeMin: 0,
      progress: 0,
      lastPulse: Date.now(),

      // new: activation progress (visual only)
      activationStep: 1,
      nodeCount: 0,
      etaMin: 0,
      syncPercent: 0,
    };

    this._timer = null;
  }

  componentDidMount() {
    // If active => run mining engine. If provisioning => run activation engine.
    if (this.isActive() || this.isProvisioning()) this.startEngine();
  }

  componentWillUnmount() {
    this.stopEngine();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.autoActive !== this.props.autoActive ||
      prevProps.isProvisioning !== this.props.isProvisioning
    ) {
      if (this.isActive() || this.isProvisioning()) this.startEngine();
      else this.stopEngine(true);
    }
  }

  isActive = () => this.props.autoActive === true;

  // NEW: allow showing "activation in progress" even if autoActive is false
  isProvisioning = () => this.props.isProvisioning === true;

  startEngine = () => {
    if (this._timer) return;

    // Initialize values
    const startingProgress = this.isProvisioning() ? this.rand(10, 35) : this.rand(10, 45);

    this.setState({
      hashRate: this.isActive() ? this.rand(85, 260) : 0,
      progress: startingProgress,
      lastPulse: Date.now(),

      activationStep: this.isProvisioning() ? 1 : 4,
      nodeCount: this.isProvisioning() ? Math.round(this.rand(1, 3)) : Math.round(this.rand(3, 8)),
      etaMin: this.isProvisioning() ? Math.round(this.rand(3, 12)) : 0,
      syncPercent: this.isProvisioning() ? Math.round(this.rand(12, 45)) : 100,
    });

    this._timer = setInterval(() => {
      this.setState((s) => {
        const now = Date.now();
        const minutesAdd = now - s.lastPulse > 4500 ? 1 : 0;

        // Uptime only meaningful when active
        const newUptime = this.isActive() ? s.uptimeMin + minutesAdd : 0;

        // Hashrate only when active
        const hashShift = this.rand(-8, 10);
        const newHash = this.isActive()
          ? this.clamp(s.hashRate + hashShift, 60, 320)
          : 0;

        // Progress logic:
        // - if provisioning => activation progress
        // - if active => mining cycle progress
        let newProg = s.progress;
        let newStep = s.activationStep;
        let newNodes = s.nodeCount;
        let newEta = s.etaMin;
        let newSync = s.syncPercent;

        if (this.isProvisioning() && !this.isActive()) {
          // activation progress
          newProg = s.progress + this.rand(4, 10);
          if (newProg > 100) newProg = 100;

          // step transitions
          if (newProg < 30) newStep = 1;
          else if (newProg < 60) newStep = 2;
          else if (newProg < 90) newStep = 3;
          else newStep = 4;

          // nodes + sync
          newNodes = this.clamp(Math.round(s.nodeCount + this.rand(0, 1.2)), 1, 9);
          newSync = this.clamp(Math.round(s.syncPercent + this.rand(3, 9)), 0, 100);

          // ETA ticks down slowly
          if (minutesAdd && s.etaMin > 0) newEta = s.etaMin - 1;
          if (newProg >= 95) newEta = 0;
        } else if (this.isActive()) {
          // mining cycle progress loop
          newProg = s.progress + this.rand(2, 8);
          if (newProg >= 100) newProg = this.rand(5, 20);

          // not provisioning
          newStep = 4;
          newSync = 100;
          newEta = 0;
          newNodes = this.clamp(s.nodeCount || 5, 3, 12);
        } else {
          // inactive & not provisioning => keep calm
          newProg = 0;
          newStep = 1;
          newSync = 0;
          newEta = 0;
          newNodes = 0;
        }

        return {
          hashRate: Math.round(newHash),
          uptimeMin: newUptime,
          progress: Math.round(newProg),
          activationStep: newStep,
          nodeCount: newNodes,
          etaMin: newEta,
          syncPercent: newSync,
          lastPulse: minutesAdd ? now : s.lastPulse,
        };
      });
    }, 1200);
  };

  stopEngine = (resetAll = false) => {
    if (this._timer) clearInterval(this._timer);
    this._timer = null;

    this.setState({
      hashRate: 0,
      progress: 0,
      ...(resetAll
        ? {
            uptimeMin: 0,
            lastPulse: Date.now(),
            activationStep: 1,
            nodeCount: 0,
            etaMin: 0,
            syncPercent: 0,
          }
        : {}),
    });
  };

  // Utils
  rand = (min, max) => Math.random() * (max - min) + min;
  clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  formatUptime = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h <= 0) return `${m}m`;
    return `${h}h ${m}m`;
  };

  renderActive() {
    const { hashRate, uptimeMin, progress, nodeCount } = this.state;

    return (
      <div className="amCard amCard--active">
        <div className="amTopRow">
          <div className="amTitleWrap">
            <div className="amKicker">Mining Mode</div>
            <div className="amTitle">Auto Mining</div>
          </div>

          <div className="amBadge amBadge--live">
            <span className="amDot" />
            LIVE
          </div>
        </div>

        <div className="amHero">
          <div className="amOrb">
            <div className="amOrbRing" />
            <div className="amOrbCore">
              <div className="amOrbIcon">
                <GiMining />
              </div>
              <div className="amOrbText">
                <div className="amOrbBig">AUTO MINING ACTIVE</div>
                <div className="amOrbSmall">When you make a withdrawal, your profit is instantly sent to your wallet,<br />
                and your mining plan is automatically reactivated.<br /><br />
                This smart Auto Mode helps us avoid repeated network fees<br />
                and keeps your mining seamless and uninterrupted.<br />
                All need to reupdate your deposit plan and everything updates automatically!</div>
              </div>
            </div>
          </div>

          <div className="amSideStats">
            <div className="amMini">
              <div className="amMiniLabel">
                <MdOutlineSpeed /> Hashrate
              </div>
              <div className="amMiniValue">
                {hashRate} <span className="amUnit">GH/s</span>
              </div>
              <div className="amMiniSub">Stable · Optimized</div>
            </div>

            <div className="amMini">
              <div className="amMiniLabel">
                <MdOutlineTimer /> Uptime
              </div>
              <div className="amMiniValue">{this.formatUptime(uptimeMin)}</div>
              <div className="amMiniSub">{nodeCount} nodes connected</div>
            </div>
          </div>
        </div>

        {/* ✅ NEW: "Mining activation details" style block (even when active, shows operational details) */}
        <div className="amGrid amGrid--two">
          <div className="amStat">
            <div className="amStatLabel">
              <MdOutlineSync /> Cycle Status
            </div>
            <div className="amProgressWrap">
              <div className="amProgressBar">
                <div className="amProgressFill" style={{ width: `${progress}%` }} />
              </div>
              <div className="amProgressText">{progress}%</div>
            </div>
            <div className="amStatHint">Live mining cycle is running</div>
          </div>

          <div className="amStat">
            <div className="amStatLabel">
              <MdOutlineVerified /> Engine Health
            </div>
            <div className="amPills">
              <span className="amPill amPill--good">Verified</span>
              <span className="amPill amPill--good">Synced</span>
              <span className="amPill amPill--good">Auto-Resume ON</span>
            </div>
            <div className="amStatHint">System is stable and monitored</div>
          </div>
        </div>
      </div>
    );
  }

  renderProvisioning() {
    const { progress, activationStep, nodeCount, etaMin, syncPercent } = this.state;

    const stepText =
      activationStep === 1
        ? "Initializing mining engine"
        : activationStep === 2
        ? "Verifying deposit plan"
        : activationStep === 3
        ? "Syncing mining nodes"
        : "Finalizing activation";

    return (
      <div className="amCard amCard--active amCard--provisioning">
        <div className="amTopRow">
          <div className="amTitleWrap">
            <div className="amKicker">Mining Status</div>
            <div className="amTitle">Activation In Progress</div>
          </div>

          <div className="amBadge amBadge--live amBadge--sync">
            <span className="amDot" />
            SYNCING
          </div>
        </div>

        <div className="amHero">
          <div className="amOrb">
            <div className="amOrbRing" />
            <div className="amOrbCore">
              <div className="amOrbIcon">
                <MdOutlineCloudUpload />
              </div>
              <div className="amOrbText">
                <div className="amOrbBig">SETTING UP</div>
                <div className="amOrbSmall">
                  Your mining activation is being processed. Please keep your dashboard open.
                </div>
              </div>
            </div>
          </div>

          <div className="amSideStats">
            <div className="amMini">
              <div className="amMiniLabel">
                <MdOutlineSync className="amSpinIcon" /> Current Step
              </div>
              <div className="amMiniValue">Step {activationStep}/4</div>
              <div className="amMiniSub">{stepText}</div>
            </div>

            <div className="amMini">
              <div className="amMiniLabel">
                <MdOutlineTimer /> Estimated Time
              </div>
              <div className="amMiniValue">{etaMin <= 0 ? "Almost done" : `${etaMin} min`}</div>
              <div className="amMiniSub">{nodeCount} nodes preparing</div>
            </div>
          </div>
        </div>

        <div className="amGrid">
          <div className="amStat">
            <div className="amStatLabel">
              <MdOutlineSync /> Activation Progress
            </div>
            <div className="amProgressWrap">
              <div className="amProgressBar">
                <div className="amProgressFill" style={{ width: `${progress}%` }} />
              </div>
              <div className="amProgressText">{progress}%</div>
            </div>
            <div className="amStatHint">We are connecting and syncing your mining plan</div>
          </div>

          <div className="amStat">
            <div className="amStatLabel">
              <MdOutlineVerified /> Verification
            </div>
            <div className="amPills">
              <span className={"amPill " + (progress >= 30 ? "amPill--good" : "amPill--wait")}>
                Deposit Verified
              </span>
              <span className={"amPill " + (progress >= 60 ? "amPill--good" : "amPill--wait")}>
                Plan Activated
              </span>
              <span className={"amPill " + (progress >= 85 ? "amPill--good" : "amPill--wait")}>
                Node Sync
              </span>
            </div>
            <div className="amStatHint">Security checks are running</div>
          </div>

          <div className="amStat">
            <div className="amStatLabel">
              <MdOutlineSpeed /> Node Sync
            </div>
            <div className="amProgressWrap">
              <div className="amProgressBar">
                <div className="amProgressFill" style={{ width: `${syncPercent}%` }} />
              </div>
              <div className="amProgressText">{syncPercent}%</div>
            </div>
            <div className="amStatHint">{nodeCount} nodes syncing</div>
          </div>
        </div>

        <div className="amNotice amNotice--warn">
          <div className="amNoticeIcon">
            <MdOutlineWarningAmber />
          </div>
          <div className="amNoticeText">
            <div className="amNoticeTitle">Do not refresh repeatedly</div>
            <div className="amNoticeSub">
              Refreshing many times may delay activation. We will complete it automatically.
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderInactive() {
    return (
      <div className="amCard amCard--inactive">
        <div className="amTopRow">
          <div className="amTitleWrap">
            <div className="amKicker">Mining Mode</div>
            <div className="amTitle">Auto Mining</div>
          </div>

          <div className="amBadge amBadge--off">
            <span className="amDot amDot--off" />
            OFF
          </div>
        </div>

        <div className="amHero">
          <div className="amOrb amOrb--off">
            <div className="amOrbRing amOrbRing--off" />
            <div className="amOrbCore amOrbCore--off">
              <div className="amOrbIcon">
                <FaLock />
              </div>
              <div className="amOrbText">
                <div className="amOrbBig amOrbBig--off">NOT ACTIVE</div>
                <div className="amOrbSmall">When you make a withdrawal, your profit is instantly sent to your wallet,<br />
                and your mining plan is automatically reactivated.<br /><br />
                This smart Auto Mode helps us avoid repeated network fees<br />
                and keeps your mining seamless and uninterrupted.<br />
                All need to reupdate your deposit plan and everything updates automatically!</div>
              </div>
            </div>
          </div>

          <div className="amSideStats">
            <div className="amMini amMini--off">
              <div className="amMiniLabel">
                <MdOutlineSpeed /> Hashrate
              </div>
              <div className="amMiniValue">
                0 <span className="amUnit">GH/s</span>
              </div>
              <div className="amMiniSub">Paused</div>
            </div>

            <div className="amMini amMini--off">
              <div className="amMiniLabel">
                <MdOutlineTimer /> Status
              </div>
              <div className="amMiniValue">Inactive</div>
              <div className="amMiniSub">Activate to start</div>
            </div>
          </div>
        </div>

        {/* ✅ Your updated text block */}
        

        <div className="amNotice">
          <div className="amNoticeIcon">
            <FaBolt />
          </div>
          <div className="amNoticeText">
            <div className="amNoticeTitle">Activate Auto Mining</div>
            <div className="amNoticeSub">
              Keep mining running automatically — every time you cash-out.
            </div>
          </div>
        </div>

        {/* Buttons removed as you requested */}
      </div>
    );
  }

  render() {
    // Priority: if provisioning (and not yet active) show provisioning UI
    if (this.isProvisioning() && !this.isActive()) {
      return <div className="amWrap">{this.renderProvisioning()}</div>;
    }

    return <div className="amWrap">{this.isActive() ? this.renderActive() : this.renderInactive()}</div>;
  }
}
