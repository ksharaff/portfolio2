import chessImg from '../assets/chess.png'
import sentimentImg from '../assets/sentiment.jpg'

const showcases = [
  {
    title: 'C+- Custom Chess Game',
    description:
      'A fully functioning chess game with custom game logic.',
    image: chessImg,
    href: 'https://github.com/kxredo/custom-chess',
    stack: ['Java, Java Swing'],
  },
  {
    title: 'Sentiment Analysis',
    description:
      'Machine learning project using PyTorch to analyze Amazon products sentiment with natural language processing techniques',
    image: sentimentImg,
    href: 'https://github.com/ksharaff/sentiment-analysis',
    stack: ['Python', 'PyTorch', 'ML'],
  }
]

export function ShowcasesSection() {
  return (
    <section className="snap-section showcases" id="showcases">
      <div className="showcase-container">
        <div className="showcase-head">
          <div className="section-title">Showcases.</div>
          <p className="section-lede">
            These are some highlight projects. Each page discusses the purpose of the project, what was learned, and how I came up with solutions.
          </p>
        </div>

        <div className="showcase-carousel">
          <div className="showcase-grid">
            {showcases.map((item, index) => (
              <article className="showcase-card" key={item.title}>
                <div className="showcase-media">
                  <a
                    className="media-link"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${item.title}`}
                  >
                    <img src={item.image} alt={item.title} />
                    {index === showcases.length - 1 && (
                      <div className="nav-arrow">›</div>
                    )}
                  </a>
                  <div className="tech-chips" aria-label="Tech stack">
                    {item.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="showcase-body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a
                    className="pill-link"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    VIEW PROJECT
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
