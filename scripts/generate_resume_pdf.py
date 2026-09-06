#!/usr/bin/env python3
import os
import subprocess
import textwrap

def esc(text):
    """Safely escape PostScript string literals."""
    return text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')

def generate_ps():
    lines = []
    lines.append("%!PS-Adobe-3.0")
    lines.append("%%Title: Xopher \"XP\" Pollard - Resume")
    lines.append("%%Creator: Antigravity Systems")
    lines.append("%%Pages: 1")
    lines.append("%%BoundingBox: 0 0 612 792")
    lines.append("%%DocumentMedia: Letter 612 792 0 () ()")
    lines.append("%%EndComments")
    lines.append("/inch { 72 mul } def")

    # Font definitions
    lines.append("""
/TitleFont /Helvetica-Bold findfont 17 scalefont def
/SubtitleFont /Helvetica-Bold findfont 9.2 scalefont def
/ContactFont /Helvetica findfont 7.8 scalefont def
/SecHeadFont /Helvetica-Bold findfont 8.8 scalefont def
/RoleFont /Helvetica-Bold findfont 8.4 scalefont def
/CompFont /Helvetica-Oblique findfont 8 scalefont def
/DateFont /Helvetica-Bold findfont 7.8 scalefont def
/BodyFont /Helvetica findfont 7.6 scalefont def
/BodyBoldFont /Helvetica-Bold findfont 7.6 scalefont def
/BulletFont /Helvetica findfont 7 scalefont def

/c-black { 0.05 0.05 0.05 setrgbcolor } def
/c-charcoal { 0.18 0.18 0.18 setrgbcolor } def
/c-gray { 0.35 0.35 0.35 setrgbcolor } def
/c-rule { 0.75 0.75 0.75 setrgbcolor } def
/c-accent { 0.02 0.42 0.52 setrgbcolor } def
""")

    lines.append("%%PAGE: 1 1")
    lines.append("save")
    lines.append("0.32 inch 766 translate")
    lines.append("/left 0 def")
    lines.append("/right 566 def")
    lines.append("/y 0 def")

    # Header Name
    lines.append("TitleFont setfont c-black")
    name = 'XOPHER "XP" POLLARD'
    lines.append(f"({esc(name)}) stringwidth pop right exch sub 2 div y moveto ({esc(name)}) show")

    # Subtitle
    lines.append("/y y 13.5 sub def")
    lines.append("SubtitleFont setfont c-accent")
    subtitle = 'PRINCIPAL SYSTEMS ARCHITECT & SYSTEMS SYNTHESIST'
    lines.append(f"({esc(subtitle)}) stringwidth pop right exch sub 2 div y moveto ({esc(subtitle)}) show")

    # Contact line
    lines.append("/y y 11 sub def")
    lines.append("ContactFont setfont c-gray")
    contact = 'Tucson, AZ   |   520-762-4947   |   hello@xophz.com   |   linkedin.com/in/xophz   |   github.com/xopherdeep   |   xophz.com'
    lines.append(f"({esc(contact)}) stringwidth pop right exch sub 2 div y moveto ({esc(contact)}) show")

    # Divider
    lines.append("/y y 4.5 sub def")
    lines.append("0.8 setlinewidth c-black")
    lines.append("left y moveto right y lineto stroke")

    def section_header(title):
        out = [
            "/y y 10 sub def",
            "SecHeadFont setfont c-black",
            f"left y moveto ({esc(title)}) show",
            "0.5 setlinewidth c-rule",
            "left y 2 sub moveto right y 2 sub lineto stroke",
            "/y y 7.5 sub def"
        ]
        return "\n".join(out)

    # 1. Executive Profile
    lines.append(section_header("EXECUTIVE PROFILE"))
    lines.append("BodyFont setfont c-charcoal")
    exec_summary = (
        "A results-driven Principal Systems Architect and Practice Lead with over 25 years of experience designing, "
        "modernizing, and orchestrating mission-critical distributed infrastructure. Proven track record deploying automated, "
        "multi-tenant cloud and edge networks supporting 25+ production platforms processing 160,000+ aggregate monthly requests "
        "with 99.99% availability. Deep technical authority across Kubernetes, Infrastructure as Code (Terraform), event-driven "
        "streaming pipelines, sovereign protocol design (w4 Protocol), and modern browser-based spatial rendering engines (WebGPU). "
        "Adept at leading cross-functional engineering teams, eliminating technical debt, and translating ambiguous business and "
        "scientific requirements into durable, self-healing platforms."
    )
    for line in textwrap.wrap(exec_summary, width=130):
        lines.append(f"left y moveto ({esc(line)}) show /y y 8.6 sub def")

    # 2. Core Architecture Competencies
    lines.append(section_header("CORE ARCHITECTURE & ENGINEERING COMPETENCIES"))
    competencies = [
        ("Cloud-Native & Distributed Systems: ", "Kubernetes, Docker, AWS (20+ services), GCP, Terraform (IaC), Microservices, Multi-Tenancy, Zero-Trust Networking, Edge Caching, Sovereign Protocols (w4)."),
        ("High-Throughput Data & Observability: ", "Event-Driven Pipelines, Asynchronous Queuing, Telemetry Streaming, REST/GraphQL APIs, Prometheus, OpenTelemetry, SRE Runbooks, Distributed Caching."),
        ("Full-Stack, Graphics & Spatial Computing: ", "TypeScript, Node.js, Python, C#, WebGPU/WebGL Shaders, Vue.js/Nuxt, React, Linux Internals, Distributed State Orchestration."),
        ("Agentic Systems & Architecture: ", "Disciplined Atomic Design (Atoms/Molecules/Organisms), Context-Isolated AI Agent Workflows, Prompt Architecture, Automated Self-Healing Runtimes.")
    ]
    for bold_prefix, text in competencies:
        combined = bold_prefix + text
        wrapped = textwrap.wrap(combined, width=130)
        for i, wline in enumerate(wrapped):
            if i == 0:
                lines.append(f"BodyBoldFont setfont c-black left y moveto ({esc(bold_prefix)}) show")
                rest = wline[len(bold_prefix):]
                lines.append(f"BodyFont setfont c-charcoal ({esc(rest)}) show /y y 8.5 sub def")
            else:
                lines.append(f"BodyFont setfont c-charcoal left y moveto ({esc(wline)}) show /y y 8.5 sub def")

    # 3. Flagship Applications & Sovereign Platforms
    lines.append(section_header("FLAGSHIP APPLICATIONS & SOVEREIGN PLATFORMS DEVELOPED"))
    apps = [
        ("YouMeOS (Spatial Web Operating System): ", "Architected browser-based spatial OS using Vue 3 and WebGPU rendering pipelines (HeliOS, NexOS, NoOSphere) for dense volumetric 3D information spaces with native frame stability."),
        ("COMPASS Engine & Sparks Platform: ", "Designed bespoke personal application platform and unified tool ecosystem (CRM, quest logs, analytics) built on rigid Atomic Design with zero-latency local execution."),
        ("BlackBOX & w4 Protocol: ", "Engineered proprietary sovereign infrastructure nodes with automated self-healing runtimes, multi-tenant container orchestration, and w4 Hyper-cube distributed protocol."),
        ("MRO Planner Wizard: ", "Built enterprise digital planning tool and automated onboarding ecosystems providing structural clarity and validation to mission-critical daily workflows."),
        ("Do It For The XP & GlowitheFlow: ", "Created gamified productivity progression engines and creator mutual promotion networks featuring decentralized engagement mechanics and flow economics.")
    ]
    for bold_prefix, text in apps:
        combined = bold_prefix + text
        wrapped = textwrap.wrap(combined, width=130)
        for i, wline in enumerate(wrapped):
            if i == 0:
                lines.append(f"BodyBoldFont setfont c-black left y moveto ({esc(bold_prefix)}) show")
                rest = wline[len(bold_prefix):]
                lines.append(f"BodyFont setfont c-charcoal ({esc(rest)}) show /y y 8.5 sub def")
            else:
                lines.append(f"BodyFont setfont c-charcoal left 10 add y moveto ({esc(wline)}) show /y y 8.5 sub def")

    # 4. Professional Experience
    lines.append(section_header("PROFESSIONAL EXPERIENCE"))

    # Job 1
    lines.append("RoleFont setfont c-black left y moveto (Managing Practice Lead & Principal Architect) show")
    lines.append(f"DateFont setfont right ({esc('12/2004 - Present')}) stringwidth pop sub y moveto ({esc('12/2004 - Present')}) show")
    lines.append("/y y 8.2 sub def")
    lines.append(f"CompFont setfont c-gray left y moveto ({esc('Hall of the Gods, Inc. / My Compass Consulting (Tucson, AZ)')}) show")
    lines.append("/y y 8.2 sub def")

    job1_bullets = [
        ("Federated Network Operations: ", "Architected, deployed, and manage multi-tenant edge infrastructure spanning 25+ active production web platforms, routing 160,000+ monthly requests with automated edge caching and 99.99% uptime."),
        ("Sovereign Systems & Platform Engineering: ", "Designed and delivered scalable, containerized client platforms and workflow engines (including BlackBOX self-healing nodes), reducing ongoing maintenance overhead by 80%."),
        ("B2B Systems Advisory: ", "Directed technical infrastructure engagements for commercial clients, conducting full-stack architecture audits, eliminating DNS and data bottlenecks, and migrating on-prem setups into secure cloud environments."),
        ("Next-Gen Spatial Computing: ", "Engineered browser-based spatial OS prototypes (YouMeOS), stress-testing WebGPU rendering pipelines and complex state coordination for dense volumetric information spaces.")
    ]
    for b_prefix, b_text in job1_bullets:
        lines.append("BulletFont setfont c-gray left 2 add y moveto (\\267) show")
        combined = b_prefix + b_text
        wrapped = textwrap.wrap(combined, width=126)
        for i, wline in enumerate(wrapped):
            if i == 0:
                lines.append(f"BodyBoldFont setfont c-black left 9 add y moveto ({esc(b_prefix)}) show")
                rest = wline[len(b_prefix):]
                lines.append(f"BodyFont setfont c-charcoal ({esc(rest)}) show /y y 8.3 sub def")
            else:
                lines.append(f"BodyFont setfont c-charcoal left 9 add y moveto ({esc(wline)}) show /y y 8.3 sub def")

    # Job 2
    lines.append("/y y 1.5 sub def")
    lines.append("RoleFont setfont c-black left y moveto (Principal Systems Architect & Cloud Modernization Lead) show")
    lines.append(f"DateFont setfont right ({esc('12/2021 - 01/2026')}) stringwidth pop sub y moveto ({esc('12/2021 - 01/2026')}) show")
    lines.append("/y y 8.2 sub def")
    lines.append(f"CompFont setfont c-gray left y moveto ({esc('Vi (Remote)')}) show")
    lines.append("/y y 8.2 sub def")

    job2_bullets = [
        ("Cloud Modernization: ", "Spearheaded enterprise transition from monolithic legacy systems to containerized cloud-native platforms on AWS and Kubernetes, sustaining continuous 99.99% availability without operational disruption."),
        ("Observability & Reliability: ", "Built automated SRE monitoring frameworks and APM telemetry pipelines, cutting incident mean-time-to-resolution (MTTR) by 45% and establishing strict on-call operational runbooks."),
        ("DevSecOps Standard: ", "Implemented multi-repository CI/CD automation and modular Terraform IaC frameworks, accelerating feature delivery velocity while enforcing rigid compliance and security boundaries.")
    ]
    for b_prefix, b_text in job2_bullets:
        lines.append("BulletFont setfont c-gray left 2 add y moveto (\\267) show")
        combined = b_prefix + b_text
        wrapped = textwrap.wrap(combined, width=126)
        for i, wline in enumerate(wrapped):
            if i == 0:
                lines.append(f"BodyBoldFont setfont c-black left 9 add y moveto ({esc(b_prefix)}) show")
                rest = wline[len(b_prefix):]
                lines.append(f"BodyFont setfont c-charcoal ({esc(rest)}) show /y y 8.3 sub def")
            else:
                lines.append(f"BodyFont setfont c-charcoal left 9 add y moveto ({esc(wline)}) show /y y 8.3 sub def")

    # Job 3
    lines.append("/y y 1.5 sub def")
    lines.append("RoleFont setfont c-black left y moveto (Senior Software Architect (Data-Intensive Systems)) show")
    lines.append(f"DateFont setfont right ({esc('08/2015 - 10/2019')}) stringwidth pop sub y moveto ({esc('08/2015 - 10/2019')}) show")
    lines.append("/y y 8.2 sub def")
    lines.append(f"CompFont setfont c-gray left y moveto ({esc('J.D. Mellberg Financial / Tracking First')}) show")
    lines.append("/y y 8.2 sub def")

    job3_bullets = [
        ("High-Throughput Ingestion: ", "Architected enterprise telemetry pipelines and distributed document databases, parsing and validating millions of transaction records in real time with near-zero latency and strict auditability."),
        ("Operational Cost Reduction: ", "Engineered dynamic analytics transparency layers and automated data validation services, eliminating processing redundancies and saving an estimated $1.2M in annual operational waste.")
    ]
    for b_prefix, b_text in job3_bullets:
        lines.append("BulletFont setfont c-gray left 2 add y moveto (\\267) show")
        combined = b_prefix + b_text
        wrapped = textwrap.wrap(combined, width=126)
        for i, wline in enumerate(wrapped):
            if i == 0:
                lines.append(f"BodyBoldFont setfont c-black left 9 add y moveto ({esc(b_prefix)}) show")
                rest = wline[len(b_prefix):]
                lines.append(f"BodyFont setfont c-charcoal ({esc(rest)}) show /y y 8.3 sub def")
            else:
                lines.append(f"BodyFont setfont c-charcoal left 9 add y moveto ({esc(wline)}) show /y y 8.3 sub def")

    # 5. Academic Equivalency
    lines.append(section_header("APPLIED ACADEMIC EQUIVALENCY & VERIFICATION"))
    lines.append("BodyFont setfont c-charcoal")
    ac_text = (
        "25+ years of self-directed technical mastery, production systems architecture, and distributed platform design meeting and "
        "exceeding formal academic requirements for an advanced degree in Computer Science. Consulting and corporate records verifiable "
        "via IRS filings, state corporate registries, and client delivery attestations."
    )
    for line in textwrap.wrap(ac_text, width=130):
        lines.append(f"left y moveto ({esc(line)}) show /y y 8.3 sub def")

    lines.append("restore")
    lines.append("showpage")
    lines.append("%%EOF")
    return "\n".join(lines)

def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    scratch_dir = os.path.join(root, "scratch")
    os.makedirs(scratch_dir, exist_ok=True)
    public_dir = os.path.join(root, "public")
    os.makedirs(public_dir, exist_ok=True)

    ps_file = os.path.join(scratch_dir, "resume.ps")
    pdf_file = os.path.join(public_dir, "xp_pollard_resume.pdf")

    with open(ps_file, "w") as f:
        f.write(generate_ps())

    subprocess.run([
        "ps2pdf",
        "-dDEVICEWIDTHPOINTS=612",
        "-dDEVICEHEIGHTPOINTS=792",
        "-dPDFSETTINGS=/prepress",
        ps_file,
        pdf_file
    ], check=True)
    print(f"Generated PDF successfully: {pdf_file}")

if __name__ == "__main__":
    main()
