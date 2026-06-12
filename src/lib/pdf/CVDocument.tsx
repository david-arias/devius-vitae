import {
  Document,
  Page,
  View,
  Text,
  Link,
  StyleSheet,
} from '@react-pdf/renderer'

// ─── Brand colors ────────────────────────────────────────────────────────────
const C = {
  sidebarBg:    '#0D1117',
  sidebarBg2:   '#161B22',
  mainBg:       '#FFFFFF',
  primary:      '#10B981',
  primaryDark:  '#059669',
  sideText:     '#F0FDF4',
  sideMuted:    '#94A3B8',
  sideDivider:  '#1E293B',
  mainText:     '#0F172A',
  mainMuted:    '#475569',
  mainLight:    '#94A3B8',
  mainDivider:  '#E2E8F0',
  tagBg:        '#F0FDF4',
  tagText:      '#065F46',
  errorBg:      '#FEF2F2',
  currentBg:    '#ECFDF5',
  currentText:  '#065F46',
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    fontSize: 9,
  },

  // ── SIDEBAR ──────────────────────────────────────────────────────────────
  sidebar: {
    width: 210,
    backgroundColor: C.sidebarBg,
    padding: '28 20 24 20',
    flexDirection: 'column',
  },
  sideSection: {
    marginBottom: 18,
  },
  sideLabel: {
    fontSize: 7.5,
    fontFamily: 'Helvetica-Bold',
    color: C.primary,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  sideDivider: {
    height: 1,
    backgroundColor: C.sideDivider,
    marginBottom: 10,
  },

  // Avatar / Letra
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: C.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarLetter: {
    fontSize: 32,
    fontFamily: 'Helvetica-Bold',
    color: C.sidebarBg,
    lineHeight: 1,
  },

  name: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: C.sideText,
    marginBottom: 4,
    lineHeight: 1.2,
  },
  jobTitle: {
    fontSize: 9.5,
    color: C.primary,
    lineHeight: 1.4,
    marginBottom: 4,
  },
  sideBio: {
    fontSize: 8.5,
    color: C.sideMuted,
    lineHeight: 1.6,
    marginTop: 8,
  },

  // Contacto
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
    gap: 6,
  },
  contactDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: C.primary,
    marginTop: 2,
    flexShrink: 0,
  },
  contactText: {
    fontSize: 8.5,
    color: C.sideMuted,
    lineHeight: 1.5,
    flex: 1,
  },
  contactLink: {
    fontSize: 8.5,
    color: C.primary,
    lineHeight: 1.5,
    flex: 1,
  },

  // Habilidades
  skillRow: {
    marginBottom: 7,
  },
  skillLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  skillName: {
    fontSize: 8.5,
    color: C.sideText,
  },
  skillPct: {
    fontSize: 7.5,
    color: C.primary,
  },
  skillBarBg: {
    height: 3,
    backgroundColor: C.sideDivider,
    borderRadius: 2,
  },
  skillBarFill: {
    height: 3,
    backgroundColor: C.primary,
    borderRadius: 2,
  },

  // Servicios sidebar
  sideService: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    gap: 6,
  },
  sideServiceDot: {
    width: 5,
    height: 5,
    borderRadius: 1,
    backgroundColor: C.primary,
    marginTop: 1.5,
    flexShrink: 0,
  },
  sideServiceText: {
    fontSize: 8.5,
    color: C.sideText,
    lineHeight: 1.4,
    flex: 1,
  },

  // ── MAIN ─────────────────────────────────────────────────────────────────
  main: {
    flex: 1,
    backgroundColor: C.mainBg,
    padding: '28 24 24 24',
    flexDirection: 'column',
  },

  // Main section heading
  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: C.primary,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  sectionDivider: {
    height: 1.5,
    backgroundColor: C.primary,
    marginBottom: 12,
    width: 32,
  },
  mainSection: {
    marginBottom: 18,
  },

  // Experience / Education items
  itemWrap: {
    marginBottom: 11,
    paddingLeft: 10,
    borderLeft: `2 solid ${C.mainDivider}`,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: C.mainText,
    flex: 1,
    lineHeight: 1.3,
  },
  itemPeriod: {
    fontSize: 7.5,
    color: C.mainLight,
    marginLeft: 8,
    flexShrink: 0,
  },
  itemCompany: {
    fontSize: 8.5,
    color: C.primary,
    marginBottom: 3,
  },
  itemDesc: {
    fontSize: 8,
    color: C.mainMuted,
    lineHeight: 1.55,
  },
  currentBadge: {
    backgroundColor: C.currentBg,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  currentBadgeText: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: C.currentText,
  },

  // Tags
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginTop: 4,
  },
  tag: {
    backgroundColor: C.tagBg,
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 3,
  },
  tagText: {
    fontSize: 7,
    color: C.tagText,
  },

  // Projects
  projectItem: {
    marginBottom: 10,
    padding: '8 10',
    backgroundColor: '#F8FAFC',
    borderRadius: 4,
    borderLeft: `3 solid ${C.primary}`,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  projectTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: C.mainText,
    flex: 1,
  },
  projectYear: {
    fontSize: 7.5,
    color: C.mainLight,
  },
  projectDesc: {
    fontSize: 8,
    color: C.mainMuted,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  projectLink: {
    fontSize: 7.5,
    color: C.primary,
  },

  // Footer
  pageFooter: {
    marginTop: 'auto',
    paddingTop: 10,
    borderTop: `1 solid ${C.mainDivider}`,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 7,
    color: C.mainLight,
  },
  footerLink: {
    fontSize: 7,
    color: C.primary,
  },
})

// ─── Types ────────────────────────────────────────────────────────────────────
interface Settings {
  hero_name?: string
  hero_title?: string
  hero_bio?: string
  hero_letter?: string
  contact_email?: string
  contact_phone?: string
  contact_location?: string
}
interface ExpItem   { id: string; title: string; company: string; period: string; description?: string; current?: boolean }
interface EduItem   { id: string; title: string; institution: string; type?: string; description?: string }
interface SkillItem { id: string; name: string; percentage: number }
interface ServiceItem { id: string; title: string; tags?: string[] }
interface ProjectItem { id: string; title: string; description?: string; tags?: string[]; live_url?: string; year?: string }

interface CVProps {
  settings?: Settings | null
  experience?: ExpItem[]
  education?: EduItem[]
  skills?: SkillItem[]
  services?: ServiceItem[]
  projects?: ProjectItem[]
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SideSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={s.sideSection}>
      <Text style={s.sideLabel}>{label}</Text>
      <View style={s.sideDivider} />
      {children}
    </View>
  )
}

function MainSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.mainSection}>
      <Text style={s.sectionTitle}>{title}</Text>
      <View style={s.sectionDivider} />
      {children}
    </View>
  )
}

function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  return (
    <View style={s.skillRow}>
      <View style={s.skillLabelRow}>
        <Text style={s.skillName}>{name}</Text>
        <Text style={s.skillPct}>{percentage}%</Text>
      </View>
      <View style={s.skillBarBg}>
        <View style={[s.skillBarFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  )
}

// ─── Main document ─────────────────────────────────────────────────────────────
export function CVDocument({
  settings,
  experience = [],
  education = [],
  skills = [],
  services = [],
  projects = [],
}: CVProps) {
  const name     = settings?.hero_name     ?? 'David Arias'
  const title    = settings?.hero_title    ?? 'Head UX/UI Designer & Frontend Developer'
  const bio      = settings?.hero_bio      ?? ''
  const letter   = settings?.hero_letter   ?? 'D'
  const email    = settings?.contact_email ?? 'devius123@gmail.com'
  const phone    = settings?.contact_phone ?? ''
  const location = settings?.contact_location ?? 'Bogotá, Colombia'

  // Top skills (max 8 sorted by percentage)
  const topSkills = [...skills].sort((a, b) => b.percentage - a.percentage).slice(0, 8)

  // Featured projects (max 3)
  const featuredProjects = projects.slice(0, 3)

  return (
    <Document
      title={`CV — ${name}`}
      author={name}
      subject="Curriculum Vitae"
      keywords="UX, UI, Designer, Frontend Developer, React, Next.js"
    >
      <Page size="A4" style={s.page}>

        {/* ══════════════════════════════════════════
            SIDEBAR
        ══════════════════════════════════════════ */}
        <View style={s.sidebar}>

          {/* Avatar + Nombre */}
          <View style={s.sideSection}>
            <View style={s.avatar}>
              <Text style={s.avatarLetter}>{letter}</Text>
            </View>
            <Text style={s.name}>{name}</Text>
            <Text style={s.jobTitle}>{title}</Text>
            {bio ? <Text style={s.sideBio}>{bio}</Text> : null}
          </View>

          {/* Contacto */}
          <SideSection label="Contacto">
            {email ? (
              <View style={s.contactRow}>
                <View style={s.contactDot} />
                <Text style={s.contactLink}>{email}</Text>
              </View>
            ) : null}
            {phone ? (
              <View style={s.contactRow}>
                <View style={s.contactDot} />
                <Text style={s.contactText}>{phone}</Text>
              </View>
            ) : null}
            <View style={s.contactRow}>
              <View style={s.contactDot} />
              <Text style={s.contactText}>{location}</Text>
            </View>
            <View style={s.contactRow}>
              <View style={s.contactDot} />
              <Link style={s.contactLink} src="https://www.linkedin.com/in/devius">
                linkedin.com/in/devius
              </Link>
            </View>
            <View style={s.contactRow}>
              <View style={s.contactDot} />
              <Link style={s.contactLink} src="https://github.com/david-arias">
                github.com/david-arias
              </Link>
            </View>
          </SideSection>

          {/* Habilidades */}
          {topSkills.length > 0 && (
            <SideSection label="Habilidades">
              {topSkills.map((skill) => (
                <SkillBar key={skill.id} name={skill.name} percentage={skill.percentage} />
              ))}
            </SideSection>
          )}

          {/* Servicios */}
          {services.length > 0 && (
            <SideSection label="Especialidades">
              {services.map((svc) => (
                <View key={svc.id} style={s.sideService}>
                  <View style={s.sideServiceDot} />
                  <Text style={s.sideServiceText}>{svc.title}</Text>
                </View>
              ))}
            </SideSection>
          )}

        </View>

        {/* ══════════════════════════════════════════
            MAIN
        ══════════════════════════════════════════ */}
        <View style={s.main}>

          {/* Experiencia */}
          {experience.length > 0 && (
            <MainSection title="Experiencia">
              {experience.map((item) => (
                <View key={item.id} style={s.itemWrap}>
                  {item.current && (
                    <View style={s.currentBadge}>
                      <Text style={s.currentBadgeText}>Actual</Text>
                    </View>
                  )}
                  <View style={s.itemHeader}>
                    <Text style={s.itemTitle}>{item.title}</Text>
                    <Text style={s.itemPeriod}>{item.period}</Text>
                  </View>
                  <Text style={s.itemCompany}>{item.company}</Text>
                  {item.description ? (
                    <Text style={s.itemDesc}>{item.description}</Text>
                  ) : null}
                </View>
              ))}
            </MainSection>
          )}

          {/* Educación */}
          {education.length > 0 && (
            <MainSection title="Educación">
              {education.map((item) => (
                <View key={item.id} style={s.itemWrap}>
                  <View style={s.itemHeader}>
                    <Text style={s.itemTitle}>{item.title}</Text>
                    {item.type ? <Text style={s.itemPeriod}>{item.type}</Text> : null}
                  </View>
                  <Text style={s.itemCompany}>{item.institution}</Text>
                  {item.description ? (
                    <Text style={s.itemDesc}>{item.description}</Text>
                  ) : null}
                </View>
              ))}
            </MainSection>
          )}

          {/* Proyectos destacados */}
          {featuredProjects.length > 0 && (
            <MainSection title="Proyectos Destacados">
              {featuredProjects.map((project) => (
                <View key={project.id} style={s.projectItem}>
                  <View style={s.projectHeader}>
                    <Text style={s.projectTitle}>{project.title}</Text>
                    {project.year ? <Text style={s.projectYear}>{project.year}</Text> : null}
                  </View>
                  {project.description ? (
                    <Text style={s.projectDesc}>{project.description}</Text>
                  ) : null}
                  {project.tags && project.tags.length > 0 && (
                    <View style={s.tagsRow}>
                      {project.tags.slice(0, 5).map((tag) => (
                        <View key={tag} style={s.tag}>
                          <Text style={s.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {project.live_url ? (
                    <Link src={project.live_url} style={[s.projectLink, { marginTop: 4 }]}>
                      {project.live_url}
                    </Link>
                  ) : null}
                </View>
              ))}
            </MainSection>
          )}

          {/* Footer */}
          <View style={s.pageFooter}>
            <Text style={s.footerText}>
              {name} — Curriculum Vitae {new Date().getFullYear()}
            </Text>
            <Link src={`mailto:${email}`} style={s.footerLink}>{email}</Link>
          </View>

        </View>
      </Page>
    </Document>
  )
}
