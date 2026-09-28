import { useMemo, useState } from "react";
import "./App.css";

const sampleLogs = [
  {
    id: 1,
    source: "Fortinet Firewall",
    format: "Key-Value",
    raw: 'date=2026-09-19 time=10:25:41 srcip=192.168.1.20 dstip=10.0.0.5 srcport=443 dstport=22 proto=TCP action=blocked severity=high',
  },
  {
    id: 2,
    source: "Cisco ASA",
    format: "Syslog",
    raw: '<134>Sep 19 10:25:41 firewall: SRC=192.168.1.20 DST=10.0.0.5 SPT=443 DPT=22 PROTO=TCP ACTION=BLOCK',
  },
  {
    id: 3,
    source: "Palo Alto",
    format: "CEF",
    raw: 'CEF:0|Palo Alto|Firewall|1.0|100|Network Threat|8|src=192.168.1.20 dst=10.0.0.5 spt=443 dpt=22 proto=TCP act=blocked',
  },
  {
    id: 4,
    source: "Cloud Gateway",
    format: "JSON",
    raw: '{"src_ip":"192.168.1.20","dst_ip":"10.0.0.5","src_port":443,"dst_port":22,"protocol":"TCP","action":"blocked","severity":"high"}',
  },
];

const parsers = [
  ["Fortinet Firewall Parser", "Key-Value", "ACTIVE", "violet"],
  ["Cisco ASA Parser", "Syslog", "ACTIVE", "cyan"],
  ["Palo Alto Parser", "CEF", "ACTIVE", "pink"],
  ["Cloud Gateway Parser", "JSON", "ACTIVE", "green"],
];

function App() {
  const [page, setPage] = useState("dashboard");
  const [dark, setDark] = useState(true);
  const [logs, setLogs] = useState([]);
  const [parserName, setParserName] = useState("");
  const [parserFormat, setParserFormat] = useState("JSON");
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const [registeredParsers, setRegisteredParsers] =
    useState(parsers);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const processLog = (log) => {
    const event = {
      ...log,
      traceId:
        "ULPF-" +
        Math.random().toString(36).substring(2, 9).toUpperCase(),
      timestamp: "2026-09-19 10:25:41",
      sourceIp: "192.168.1.20",
      destinationIp: "10.0.0.5",
      sourcePort: "443",
      destinationPort: "22",
      protocol: "TCP",
      action: "BLOCKED",
      severity: "HIGH",
      eventType: "NETWORK_SECURITY",
    };

    setLogs((old) => [event, ...old]);
    showToast("Event successfully normalized ✓");
  };

  const processAll = () => {
    const events = sampleLogs.map((log) => ({
      ...log,
      traceId:
        "ULPF-" +
        Math.random().toString(36).substring(2, 9).toUpperCase(),
      timestamp: "2026-09-19 10:25:41",
      sourceIp: "192.168.1.20",
      destinationIp: "10.0.0.5",
      sourcePort: "443",
      destinationPort: "22",
      protocol: "TCP",
      action: "BLOCKED",
      severity: "HIGH",
      eventType: "NETWORK_SECURITY",
    }));

    setLogs(events);
    showToast("Universal preprocessing completed ✓");
  };

  const registerParser = () => {
    if (!parserName.trim()) {
      showToast("Enter a parser name");
      return;
    }

    setRegisteredParsers((old) => [
      ...old,
      [parserName, parserFormat, "ACTIVE", "yellow"],
    ]);

    setParserName("");
    showToast("New parser registered successfully ✓");
  };

  const filteredLogs = useMemo(() => {
    return logs.filter((log) =>
      JSON.stringify(log)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [logs, search]);

  const nav = [
    ["dashboard", "⌂", "Dashboard"],
    ["ingestion", "⇩", "Log Ingestion"],
    ["events", "◈", "Event Explorer"],
    ["parsers", "⚙", "Parser Registry"],
    ["architecture", "◇", "Architecture"],
  ];

  return (
    <div className={`app ${dark ? "dark" : "light"}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">U</div>
          <div>
            <h2>ULPF</h2>
            <span>Universal Log Framework</span>
          </div>
        </div>

        <div className="nav-title">COMMAND CENTER</div>

        <nav>
          {nav.map(([id, icon, label], index) => (
            <button
              key={id}
              className={`nav-item ${
                page === id ? "active" : ""
              } nav-color-${index}`}
              onClick={() => setPage(id)}
            >
              <span className="nav-icon">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="live-dot"></span>
            <div>
              <b>System Online</b>
              <small>Preprocessing Engine</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <span className="eyebrow">SECURITY DATA PLATFORM</span>
            <h3>Universal Log Pre-processing Framework</h3>
          </div>

          <div className="top-actions">
            <span className="connection">
              <i></i> LIVE
            </span>

            <button
              className="theme-btn"
              onClick={() => setDark(!dark)}
            >
              {dark ? "☀" : "☾"}
            </button>
          </div>
        </header>

        <section className="content">

          {page === "dashboard" && (
            <>
              <div className="hero">
                <div className="hero-content">
                  <div className="hero-tag">
                    ● UNIVERSAL EVENT PROCESSING
                  </div>

                  <h1>
                    Different Logs.
                    <br />
                    <span>One Trusted Event.</span>
                  </h1>

                  <p>
                    ULPF ingests heterogeneous logs from multiple
                    vendors and technologies, preserves the original
                    evidence, normalizes events and maintains
                    complete traceability.
                  </p>

                  <div className="hero-buttons">
                    <button
                      className="btn primary"
                      onClick={processAll}
                    >
                      ▶ Run Universal Demo
                    </button>

                    <button
                      className="btn secondary"
                      onClick={() => setPage("architecture")}
                    >
                      View Architecture →
                    </button>
                  </div>
                </div>

                <div className="hero-orbit">
                  <div className="orbit orbit-one"></div>
                  <div className="orbit orbit-two"></div>
                  <div className="core">
                    <strong>ULPF</strong>
                    <small>ENGINE</small>
                  </div>
                </div>
              </div>

              <div className="stats-grid">
                <Stat
                  color="violet"
                  icon="◈"
                  value="04"
                  label="Input Formats"
                />
                <Stat
                  color="cyan"
                  icon="↗"
                  value="100%"
                  label="Traceability"
                />
                <Stat
                  color="green"
                  icon="✓"
                  value="01"
                  label="Unified Schema"
                />
                <Stat
                  color="yellow"
                  icon="⚡"
                  value="LIVE"
                  label="Processing Engine"
                />
              </div>

              <div className="panel">
                <PanelTitle
                  title="Universal Processing Pipeline"
                  subtitle="Multiple sources → One normalized event"
                />

                <div className="pipeline">
                  <Pipeline color="cyan" title="INGEST" icon="⇩" />
                  <Arrow />
                  <Pipeline color="violet" title="PARSE" icon="◈" />
                  <Arrow />
                  <Pipeline color="pink" title="NORMALIZE" icon="◆" />
                  <Arrow />
                  <Pipeline color="green" title="TRACE" icon="✓" />
                  <Arrow />
                  <Pipeline color="yellow" title="ANALYTICS" icon="◉" />
                </div>
              </div>

              <div className="panel">
                <PanelTitle
                  title="Heterogeneous Sources"
                  subtitle="Different syntax, same security meaning"
                />

                <div className="source-grid">
                  {sampleLogs.map((log, index) => (
                    <div
                      className={`source-card source-${index}`}
                      key={log.id}
                    >
                      <div className="source-top">
                        <span className="source-icon">
                          {["◉", "◆", "◇", "☁"][index]}
                        </span>

                        <span className="format">
                          {log.format}
                        </span>
                      </div>

                      <h3>{log.source}</h3>

                      <p>
                        Vendor-specific security event
                        converted into a common structure.
                      </p>

                      <button
                        className="mini-btn"
                        onClick={() => processLog(log)}
                      >
                        Process →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {page === "ingestion" && (
            <>
              <PageHeader
                title="Universal Log Ingestion"
                subtitle="Accept logs from any source, vendor or technology."
              />

              <div className="ingestion-banner">
                <div className="big-icon">⇩</div>
                <div>
                  <h2>Universal Input Layer</h2>
                  <p>
                    Syslog • JSON • CEF • CSV • Key-Value
                  </p>
                </div>
              </div>

              <div className="source-grid">
                {sampleLogs.map((log, index) => (
                  <div
                    className={`source-card source-${index}`}
                    key={log.id}
                  >
                    <div className="source-top">
                      <span className="source-icon">
                        {["◉", "◆", "◇", "☁"][index]}
                      </span>
                      <span className="format">
                        {log.format}
                      </span>
                    </div>

                    <h3>{log.source}</h3>

                    <pre className="raw-log">
                      {log.raw}
                    </pre>

                    <button
                      className="btn primary full"
                      onClick={() => processLog(log)}
                    >
                      Process Event
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === "events" && (
            <>
              <PageHeader
                title="Event Explorer"
                subtitle="Normalized events with source-to-event traceability."
              />

              <div className="toolbar">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search events, source, trace ID..."
                />

                <button
                  className="btn primary"
                  onClick={processAll}
                >
                  Normalize All
                </button>

                <button
                  className="btn danger"
                  onClick={() => setLogs([])}
                >
                  Clear
                </button>
              </div>

              {filteredLogs.length === 0 ? (
                <div className="empty-state">
                  <div>◈</div>
                  <h3>No processed events</h3>
                  <p>
                    Run the Universal Demo to generate normalized
                    security events.
                  </p>
                </div>
              ) : (
                <div className="panel table-panel">
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>Trace ID</th>
                          <th>Source</th>
                          <th>Format</th>
                          <th>Source IP</th>
                          <th>Destination</th>
                          <th>Action</th>
                          <th>Severity</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredLogs.map((event) => (
                          <tr key={event.traceId}>
                            <td>
                              <code>{event.traceId}</code>
                            </td>
                            <td>{event.source}</td>
                            <td>
                              <Badge
                                color="violet"
                                text={event.format}
                              />
                            </td>
                            <td>{event.sourceIp}</td>
                            <td>{event.destinationIp}</td>
                            <td>
                              <Badge
                                color="red"
                                text={event.action}
                              />
                            </td>
                            <td>
                              <Badge
                                color="yellow"
                                text={event.severity}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {logs.length > 0 && (
                <div className="normalized-box">
                  <div className="normalized-title">
                    <span>✓</span>
                    Normalized Common Event Schema
                  </div>

                  <pre>
{`{
  "event_type": "NETWORK_SECURITY",
  "source_ip": "192.168.1.20",
  "destination_ip": "10.0.0.5",
  "source_port": 443,
  "destination_port": 22,
  "protocol": "TCP",
  "action": "BLOCKED",
  "severity": "HIGH",
  "traceable": true
}`}
                  </pre>
                </div>
              )}
            </>
          )}

          {page === "parsers" && (
            <>
              <PageHeader
                title="Parser Registry"
                subtitle="Plug-and-play source onboarding without changing the core engine."
              />

              <div className="register-grid">
                <div className="panel register-panel">
                  <PanelTitle
                    title="Register New Parser"
                    subtitle="Onboard a new vendor or log format"
                  />

                  <label>Parser Name</label>
                  <input
                    value={parserName}
                    onChange={(e) =>
                      setParserName(e.target.value)
                    }
                    placeholder="Example: AWS CloudTrail Parser"
                  />

                  <label>Log Format</label>
                  <select
                    value={parserFormat}
                    onChange={(e) =>
                      setParserFormat(e.target.value)
                    }
                  >
                    <option>JSON</option>
                    <option>Syslog</option>
                    <option>CEF</option>
                    <option>Key-Value</option>
                    <option>CSV</option>
                  </select>

                  <button
                    className="btn primary full"
                    onClick={registerParser}
                  >
                    + Register Parser
                  </button>
                </div>

                <div className="panel">
                  <PanelTitle
                    title="Active Parser Registry"
                    subtitle={`${registeredParsers.length} parsers available`}
                  />

                  <div className="parser-list">
                    {registeredParsers.map((parser, index) => (
                      <div
                        className="parser-row"
                        key={`${parser[0]}-${index}`}
                      >
                        <div className={`parser-dot ${parser[3]}`}></div>

                        <div className="parser-details">
                          <strong>{parser[0]}</strong>
                          <small>{parser[1]} parser</small>
                        </div>

                        <Badge
                          color="green"
                          text={parser[2]}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {page === "architecture" && (
            <>
              <PageHeader
                title="ULPF Architecture"
                subtitle="A vendor-neutral preprocessing layer between data sources and analytics."
              />

              <div className="architecture">
                <ArchBox
                  color="cyan"
                  number="01"
                  title="Source Layer"
                  text="Firewalls, servers, cloud platforms, applications and network devices."
                />

                <div className="arch-arrow">↓</div>

                <ArchBox
                  color="violet"
                  number="02"
                  title="Universal Ingestion"
                  text="Accept heterogeneous formats through a common ingestion interface."
                />

                <div className="arch-arrow">↓</div>

                <ArchBox
                  color="pink"
                  number="03"
                  title="Parsing Engine"
                  text="Source-specific parsers extract meaningful attributes from raw events."
                />

                <div className="arch-arrow">↓</div>

                <ArchBox
                  color="yellow"
                  number="04"
                  title="Normalization"
                  text="Convert different syntax into one standardized event taxonomy."
                />

                <div className="arch-arrow">↓</div>

                <ArchBox
                  color="green"
                  number="05"
                  title="Traceability"
                  text="Maintain a direct relationship between normalized data and original evidence."
                />

                <div className="arch-arrow">↓</div>

                <ArchBox
                  color="red"
                  number="06"
                  title="Analytics Ready"
                  text="Prepared for SIEM, data lakes, dashboards, detection and AI/ML pipelines."
                />
              </div>

              <div className="judge-line">
                <span>ULPF</span>
                converts heterogeneous logs into a
                <strong> trusted, traceable and analytics-ready event stream.</strong>
              </div>
            </>
          )}
        </section>
      </main>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

function Stat({ color, icon, value, label }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function PanelTitle({ title, subtitle }) {
  return (
    <div className="panel-title">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function Pipeline({ color, title, icon }) {
  return (
    <div className={`pipeline-step ${color}`}>
      <div>{icon}</div>
      <strong>{title}</strong>
    </div>
  );
}

function Arrow() {
  return <span className="pipeline-arrow">→</span>;
}

function Badge({ color, text }) {
  return <span className={`badge ${color}`}>{text}</span>;
}

function ArchBox({ color, number, title, text }) {
  return (
    <div className={`arch-box ${color}`}>
      <div className="arch-number">{number}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <div className="page-header">
      <span>ULPF / MODULE</span>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

export default App;