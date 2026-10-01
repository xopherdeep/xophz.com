#!/usr/bin/env python3
"""
Generate executive vector PDF resume for Xopher (XP) Pollard.
Uses Cairo and Pango for pixel-perfect typography, vector lines, and exact single-page Letter fit.
"""

import sys
import cairo
import gi

gi.require_version('Pango', '1.0')
gi.require_version('PangoCairo', '1.0')
gi.require_version('GLib', '2.0')
from gi.repository import Pango, PangoCairo, GLib

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4))

def esc(text):
    return GLib.markup_escape_text(text)

# Executive Color Palette
COLOR_PRIMARY = hex_to_rgb('0f172a')     # Slate 900
COLOR_ACCENT = hex_to_rgb('0284c7')      # Sky 600
COLOR_ACCENT_DARK = hex_to_rgb('0369a1') # Sky 700
COLOR_TEXT = hex_to_rgb('334155')        # Slate 700
COLOR_MUTED = hex_to_rgb('64748b')       # Slate 500
COLOR_LIGHT_LINE = hex_to_rgb('e2e8f0')  # Slate 200

# Standard US Letter (points: 72 points per inch)
PAGE_WIDTH = 612.0
PAGE_HEIGHT = 792.0
MARGIN_X = 36.0
PRINT_WIDTH = PAGE_WIDTH - (MARGIN_X * 2)  # 540 pt

class ResumeBuilder:
    def __init__(self, output_path):
        self.output_path = output_path
        self.surface = cairo.PDFSurface(output_path, PAGE_WIDTH, PAGE_HEIGHT)
        self.cr = cairo.Context(self.surface)
        self.y = 20.0

    def draw_top_accent_bar(self):
        self.cr.set_source_rgb(*COLOR_ACCENT)
        self.cr.rectangle(0, 0, PAGE_WIDTH * 0.36, 3.5)
        self.cr.fill()
        self.cr.set_source_rgb(*COLOR_PRIMARY)
        self.cr.rectangle(PAGE_WIDTH * 0.36, 0, PAGE_WIDTH * 0.64, 3.5)
        self.cr.fill()

    def create_layout(self, markup_text, font_str, width=PRINT_WIDTH, align=Pango.Alignment.LEFT):
        layout = PangoCairo.create_layout(self.cr)
        desc = Pango.FontDescription(font_str)
        layout.set_font_description(desc)
        layout.set_width(int(width * Pango.SCALE))
        layout.set_wrap(Pango.WrapMode.WORD)
        layout.set_alignment(align)
        layout.set_markup(markup_text, -1)
        return layout

    def get_layout_height(self, layout):
        _, extents = layout.get_pixel_extents()
        return extents.height

    def render_header(self):
        # Name
        name_text = '<span letter_spacing="1800"><b>XOPHER (XP) POLLARD</b></span>'
        layout_name = self.create_layout(name_text, "Liberation Sans Bold 15", align=Pango.Alignment.CENTER)
        self.cr.set_source_rgb(*COLOR_PRIMARY)
        self.cr.move_to(MARGIN_X, self.y)
        PangoCairo.show_layout(self.cr, layout_name)
        self.y += self.get_layout_height(layout_name) + 1.5

        # Subtitle
        sub_text = '<span letter_spacing="1200"><b>PRINCIPAL SYSTEMS ARCHITECT &amp; SYSTEMS SYNTHESIST</b></span>'
        layout_sub = self.create_layout(sub_text, "Liberation Sans Bold 7.8", align=Pango.Alignment.CENTER)
        self.cr.set_source_rgb(*COLOR_ACCENT)
        self.cr.move_to(MARGIN_X, self.y)
        PangoCairo.show_layout(self.cr, layout_sub)
        self.y += self.get_layout_height(layout_sub) + 2.5

        # Contact meta line
        meta_items = [
            "Tucson, AZ",
            "520-762-4947",
            "hello@xophz.com",
            "linkedin.com/in/xophz",
            "github.com/xopherdeep",
            "xophz.com"
        ]
        meta_str = ' <span color="#94a3b8">•</span> '.join(
            [f'<span color="#334155">{esc(item)}</span>' for item in meta_items]
        )
        layout_meta = self.create_layout(meta_str, "Liberation Sans 7.2", align=Pango.Alignment.CENTER)
        self.cr.move_to(MARGIN_X, self.y)
        PangoCairo.show_layout(self.cr, layout_meta)
        self.y += self.get_layout_height(layout_meta) + 4.0

        # Divider line
        self.cr.set_source_rgb(*COLOR_LIGHT_LINE)
        self.cr.set_line_width(0.75)
        self.cr.move_to(MARGIN_X, self.y)
        self.cr.line_to(MARGIN_X + PRINT_WIDTH, self.y)
        self.cr.stroke()
        self.y += 5.0

    def render_section_title(self, title):
        pill_height = 8.5
        self.cr.set_source_rgb(*COLOR_ACCENT)
        self.cr.rectangle(MARGIN_X, self.y + 0.5, 3.0, pill_height)
        self.cr.fill()

        title_text = f'<span letter_spacing="900"><b>{esc(title)}</b></span>'
        layout = self.create_layout(title_text, "Liberation Sans Bold 7.8")
        self.cr.set_source_rgb(*COLOR_PRIMARY)
        self.cr.move_to(MARGIN_X + 6.0, self.y)
        PangoCairo.show_layout(self.cr, layout)
        
        _, extents = layout.get_pixel_extents()
        line_start_x = MARGIN_X + 9.5 + extents.width
        line_y = self.y + (extents.height / 2.0)

        self.cr.set_source_rgb(*COLOR_LIGHT_LINE)
        self.cr.set_line_width(0.5)
        self.cr.move_to(line_start_x, line_y)
        self.cr.line_to(MARGIN_X + PRINT_WIDTH, line_y)
        self.cr.stroke()

        self.y += extents.height + 3.0

    def render_paragraph(self, text, font_str="Liberation Sans 7.1", line_spacing=1.09):
        layout = self.create_layout(esc(text), font_str)
        layout.set_line_spacing(line_spacing)
        self.cr.set_source_rgb(*COLOR_TEXT)
        self.cr.move_to(MARGIN_X, self.y)
        PangoCairo.show_layout(self.cr, layout)
        self.y += self.get_layout_height(layout)

    def render_bullet(self, lead_in, body, font_str="Liberation Sans 7.0", indent=8.5, line_spacing=1.06, space_below=1.0):
        bullet_y = self.y + 3.8
        self.cr.set_source_rgb(*COLOR_ACCENT)
        self.cr.arc(MARGIN_X + 2.8, bullet_y, 1.3, 0, 2 * 3.14159)
        self.cr.fill()

        content = f'<b>{esc(lead_in)}</b> {esc(body)}'
        layout = self.create_layout(content, font_str, width=PRINT_WIDTH - indent)
        layout.set_line_spacing(line_spacing)
        self.cr.set_source_rgb(*COLOR_TEXT)
        self.cr.move_to(MARGIN_X + indent, self.y)
        PangoCairo.show_layout(self.cr, layout)
        self.y += self.get_layout_height(layout) + space_below

    def render_role_header(self, role, company_line, dates):
        # Line 1: Role (left) + Dates (right)
        layout_role = self.create_layout(f'<b>{esc(role)}</b>', "Liberation Sans Bold 7.6", width=PRINT_WIDTH - 100.0)
        layout_dates = self.create_layout(f'<b><span color="#0284c7">{esc(dates)}</span></b>', "Liberation Sans Bold 7.4", width=95.0, align=Pango.Alignment.RIGHT)

        self.cr.set_source_rgb(*COLOR_PRIMARY)
        self.cr.move_to(MARGIN_X, self.y)
        PangoCairo.show_layout(self.cr, layout_role)

        self.cr.move_to(MARGIN_X + PRINT_WIDTH - 95.0, self.y)
        PangoCairo.show_layout(self.cr, layout_dates)

        h1 = max(self.get_layout_height(layout_role), self.get_layout_height(layout_dates))
        self.y += h1 + 0.5

        # Line 2: Company & details (subtle italic/muted)
        layout_company = self.create_layout(f'<span color="#475569"><i>{esc(company_line)}</i></span>', "Liberation Sans 7.0")
        self.cr.move_to(MARGIN_X, self.y)
        PangoCairo.show_layout(self.cr, layout_company)
        self.y += self.get_layout_height(layout_company) + 1.8

    def build(self):
        self.draw_top_accent_bar()
        self.render_header()

        # 1. EXECUTIVE PROFILE
        self.render_section_title("EXECUTIVE PROFILE")
        profile_text = (
            "A results-driven Principal Systems Architect and Practice Lead with over 25 years of entrepreneurial "
            "tech and digital systems experience, including 12+ years designing, modernizing, and orchestrating "
            "mission-critical enterprise software and distributed platforms. Proven track record bridging frontend applications "
            "with complex backend microservices, deploying containerized applications across AWS cloud infrastructure, "
            "modernizing monolithic codebases, and managing multi-tenant client networks sustaining 99.99% availability. "
            "Deep technical authority across TypeScript, Vue 3, Node.js, telemetry streaming pipelines processing millions "
            "of transaction records, Model Context Protocol (MCP) agentic architectures, and deterministic code generation tooling. "
            "Adept at leading cross-functional engineering teams, eliminating technical debt, and translating ambiguous business "
            "and scientific requirements into durable, production platforms."
        )
        self.render_paragraph(profile_text, "Liberation Sans 7.0", line_spacing=1.07)
        self.y += 2.5

        # 2. CORE ARCHITECTURE & ENGINEERING COMPETENCIES (2 Balanced Columns)
        self.render_section_title("CORE ARCHITECTURE & ENGINEERING COMPETENCIES")
        col_w = (PRINT_WIDTH - 12.0) / 2.0  # ~264 pt
        
        col1_items = [
            ("Cloud Systems & Architecture:", "Docker Containerization, AWS (S3, EC2, CloudFront, Route 53, RDS, Lambda), Monolith Modernization, Service Decomposition, Edge Caching, Sovereign Protocols (w4)."),
            ("Full-Stack, Graphics & Spatial Systems:", "TypeScript, JavaScript, Node.js, Python, Vue 3 & Nuxt, React, Linux Systems Administration & Bash, WebGL & Experimental WebGPU Pipelines.")
        ]
        col2_items = [
            ("Data Integration & Observability:", "REST & GraphQL APIs, Telemetry Streaming, Real-Time Dashboards, MySQL / MariaDB, Redis, SQLite, Application Monitoring, Distributed State Management."),
            ("Agentic Systems & Architecture:", "Model Context Protocol (MCP), Agentic Evals & Behavioral Benchmarks, AST Hazard Linting, Deterministic Tool-Calling Runtimes, Context-Isolated Agent Workflows, Disciplined Atomic Design.")
        ]

        start_y = self.y
        # Col 1
        y1 = start_y
        for lead, body in col1_items:
            bullet_y = y1 + 3.6
            self.cr.set_source_rgb(*COLOR_ACCENT)
            self.cr.arc(MARGIN_X + 2.5, bullet_y, 1.2, 0, 2 * 3.14159)
            self.cr.fill()

            content = f'<b>{esc(lead)}</b> {esc(body)}'
            layout = self.create_layout(content, "Liberation Sans 6.85", width=col_w - 7.0)
            layout.set_line_spacing(1.04)
            self.cr.set_source_rgb(*COLOR_TEXT)
            self.cr.move_to(MARGIN_X + 7.0, y1)
            PangoCairo.show_layout(self.cr, layout)
            y1 += self.get_layout_height(layout) + 1.2

        # Col 2
        y2 = start_y
        col2_x = MARGIN_X + col_w + 12.0
        for lead, body in col2_items:
            bullet_y = y2 + 3.6
            self.cr.set_source_rgb(*COLOR_ACCENT)
            self.cr.arc(col2_x + 2.5, bullet_y, 1.2, 0, 2 * 3.14159)
            self.cr.fill()

            content = f'<b>{esc(lead)}</b> {esc(body)}'
            layout = self.create_layout(content, "Liberation Sans 6.85", width=col_w - 7.0)
            layout.set_line_spacing(1.04)
            self.cr.set_source_rgb(*COLOR_TEXT)
            self.cr.move_to(col2_x + 7.0, y2)
            PangoCairo.show_layout(self.cr, layout)
            y2 += self.get_layout_height(layout) + 1.2

        self.y = max(y1, y2) + 1.5

        # 3. FLAGSHIP APPLICATIONS & PLATFORMS DEVELOPED
        self.render_section_title("FLAGSHIP APPLICATIONS & PLATFORMS DEVELOPED")
        apps = [
            ("YouMeOS (Spatial Web Operating System):", "Browser-based spatial desktop environment built on Vue 3 and headless REST/event-driven backends, with active R&D into custom WebGPU render pipelines."),
            ("Chemical X (Agentic AI & Engineering Standards):", "Architectural standards specification, MCP runtime tooling, and AST hazard linter authored for deterministic, zero-regression agentic software development."),
            ("My Compass Consulting & Software Suite:", "High-stakes technology advisory, enterprise legacy monolith modernization, and bespoke modular software engine engineered on rigid Atomic Design principles.")
        ]
        for lead, body in apps:
            self.render_bullet(lead, body, font_str="Liberation Sans 6.9", space_below=0.8)
        self.y += 1.5

        # 4. PROFESSIONAL EXPERIENCE
        self.render_section_title("PROFESSIONAL EXPERIENCE")

        # Role 1
        self.render_role_header(
            "Managing Practice Lead & Principal Architect",
            "Hall of the Gods, Inc. / My Compass Consulting • Tucson, AZ",
            "12/2004 - Present"
        )
        r1_bullets = [
            ("Federated Network Operations:", "Architected, deployed, and maintain multi-tenant edge infrastructure spanning 25+ active production web platforms, delivering high-availability client operations with automated edge caching and 99.99% uptime."),
            ("Sovereign Systems & Platform Engineering:", "Designed and delivered scalable, containerized client platforms and workflow engines (including BlackBOX self-healing nodes), reducing ongoing maintenance overhead by 75%."),
            ("B2B Systems Advisory:", "Directed technical infrastructure engagements for commercial clients, conducting full-stack architecture audits, eliminating DNS and data bottlenecks, and migrating on-prem setups into secure cloud environments."),
            ("Agentic Systems & Spatial Prototypes:", "Authored Chemical X agent standards, Model Context Protocol (MCP) tool bridges, and AST hazard validation suites enforcing deterministic code generation across agent runtimes.")
        ]
        for lead, body in r1_bullets:
            self.render_bullet(lead, body, font_str="Liberation Sans 6.85", space_below=0.6)
        self.y += 1.4

        # Role 2
        self.render_role_header(
            "System Architect",
            "Vi • Enterprise Systems Architecture",
            "12/2021 - 01/2026"
        )
        r2_bullets = [
            ("Frontend Architecture & Systems Bridge:", "Led architecture and development of the core frontend application codebase, serving as the primary architectural bridge between product interfaces and complex distributed backend services."),
            ("Containerization & Cloud Reliability:", "Collaborated on containerizing services with Docker across AWS environments, establishing clear API contracts and sustaining continuous 99.99% availability."),
            ("CI/CD & Engineering Velocity:", "Implemented automated CI/CD workflows and modular component architecture, accelerating feature delivery cycles while enforcing consistent quality standards across releases.")
        ]
        for lead, body in r2_bullets:
            self.render_bullet(lead, body, font_str="Liberation Sans 6.85", space_below=0.6)
        self.y += 1.4

        # Role 3
        self.render_role_header(
            "Senior Front-End Engineer & AWS Cloud Manager",
            "Madden Media • Tucson, AZ",
            "01/2020 - 10/2021"
        )
        r3_bullets = [
            ("Destination Web Platforms:", "Architected and deployed high-performance responsive web applications, interactive visual tools, and destination marketing platforms for premier travel clients."),
            ("AWS Infrastructure & Deployment:", "Managed core AWS cloud infrastructure and deployment pipelines, optimizing asset delivery, caching policies, and reliability across client production sites.")
        ]
        for lead, body in r3_bullets:
            self.render_bullet(lead, body, font_str="Liberation Sans 6.85", space_below=0.6)
        self.y += 1.4

        # Role 4
        self.render_role_header(
            "Senior Full-Stack Developer",
            "J.D. Mellberg Financial / Tracking First • FinTech Infrastructure",
            "06/2015 - 10/2019"
        )
        r4_bullets = [
            ("Operational Integration Dashboard:", "Architected and engineered real-time operational dashboard integrating Five9 telephony, Salesforce CRM, and marketing API endpoints, delivering actionable visibility into millions of lead and call records."),
            ("Lead Validation & Operational Savings:", "Engineered automated data validation and analytics transparency layers, eliminating invalid financial lead acquisition and manual data-cleansing operations to save an estimated $1.2M annually.")
        ]
        for lead, body in r4_bullets:
            self.render_bullet(lead, body, font_str="Liberation Sans 6.85", space_below=0.6)
        self.y += 1.6

        # 5. EDUCATION, CREDENTIALS & VERIFICATION
        self.render_section_title("EDUCATION, CREDENTIALS & VERIFICATION")
        equiv_text = (
            "Self-Directed Technical Mastery & Early Industry Apprentice. Verifiable corporate employment records, "
            "technical consulting engagements, client references, and OEM technical certifications available upon request."
        )
        self.render_paragraph(equiv_text, "Liberation Sans 6.9", line_spacing=1.06)

        # Bottom margin calculation
        print(f"Total height used: {self.y:.1f} pt out of {PAGE_HEIGHT} pt (Margin remaining: {PAGE_HEIGHT - self.y:.1f} pt)")

        self.surface.show_page()
        self.surface.finish()
        print(f"Wrote vector PDF to {self.output_path}")

if __name__ == "__main__":
    output_pdf = "public/xp_pollard_resume.pdf"
    if len(sys.argv) > 1:
        output_pdf = sys.argv[1]
    builder = ResumeBuilder(output_pdf)
    builder.build()
