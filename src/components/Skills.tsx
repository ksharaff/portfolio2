type Skill = { title: string; description: string; stack: string[] }

const skills: Skill[] = [
  {
    title: 'Frontend Engineering',
    description:
      'Building responsive, accessible UIs with a focus on performance and clarity.',
    stack: ['TypeScript', 'React', 'Vite', 'CSS'],
  },
  {
    title: 'Backend Engineering',
    description:
      'Designing clean REST APIs, authentication, and robust data flows.',
    stack: ['Spring Boot', 'Node.js', 'Express', 'PostgreSQL'],
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Containerizing, deploying, and monitoring apps in modern cloud environments.',
    stack: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
  },
  {
    title: 'Data & ML',
    description:
      'Prototyping ML pipelines and model training for analytics and NLP.',
    stack: ['Python', 'PyTorch', 'scikit-learn', 'Pandas'],
  },
  {
    title: 'Mobile App Development',
    description:
      'Building and designing mobile applications.',
    stack: ['Flutter', 'Dart'],
  },
]

export function SkillsSection() {
  return (
    <section className="snap-section skills" id="skills">
      <div className="skills-container">
        <div className="skills-head">
          <div className="section-title">Skills.</div>
          <p className="section-lede">
            A snapshot of my core capabilities and the technologies I use regularly.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map((item) => (
            <article className="skill-card" key={item.title}>
              <div className="skill-body">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="skill-chips" aria-label="Tech stack">
                  {item.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
