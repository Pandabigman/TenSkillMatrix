import { motion } from 'framer-motion'
import { Target, TrendingUp, Users } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import PageTransition from '../components/PageTransition.jsx'
import SkillsCarousel from '../components/content/SkillsCarousel.jsx'
import { useNavigate } from 'react-router-dom';
// import mockData from '../../api/mockEnrolledTracks.json';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
}

const placeholders = [
  {
    icon: TrendingUp,
    title: 'Your skills',
    body: 'Once you pick a role, your current level on each required skill shows here — alongside what the next level looks like.',
  },
  {
    icon: Target,
    title: 'Active targets',
    body: 'SMART goals you set will live here. The Smart Targeter will suggest a goal and a learning resource for every gap.',
  },
  {
    icon: Users,
    title: 'Team overview',
    body: 'For admins: a heatmap of every consultant against required skills, plus a feed of targets in flight across the team.',
  },
]
const mockData = [
  {
    "id": 1,
    "track_id": 101,
    "name": "DevOps Engineer",
    "overview": "Master the art of CI/CD, cloud infrastructure, containerization, and automation to streamline software delivery.",
    "imageUrl": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=600",
    "current_level": 2,
    "progressPercentage": 45,
    "overallProgress": 45,
    "levels": [
      {
        "id": 1001,
        "track_id": 101,
        "level_number": 1,
        "title": "Linux & Networking Fundamentals",
        "resources": [
          {
            "id": 5001,
            "level_id": 1001,
            "resource_type": "course",
            "title": "Linux Command Line Basics",
            "overview": "Learn essential terminal commands and file permissions.",
            "status": "completed"
          },
          {
            "id": 5002,
            "level_id": 1001,
            "resource_type": "article",
            "title": "Understanding TCP/IP and DNS",
            "overview": "Core networking concepts for sysadmins.",
            "status": "completed"
          }
        ]
      },
      {
        "id": 1002,
        "track_id": 101,
        "level_number": 2,
        "title": "Containerization (Docker)",
        "resources": [
          {
            "id": 5003,
            "level_id": 1002,
            "resource_type": "video",
            "title": "Docker in 100 Seconds",
            "overview": "Quick overview of images, containers, and volumes.",
            "status": "in_progress"
          },
          {
            "id": 5004,
            "level_id": 1002,
            "resource_type": "certification",
            "title": "Docker Certified Associate",
            "overview": "Official certification preparation.",
            "status": "not_started"
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "track_id": 102,
    "name": "Backend Engineer",
    "overview": "Build scalable APIs, design efficient database schemas, and master server-side architecture using Python and Postgres.",
    "imageUrl": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
    "current_level": 1,
    "progressPercentage": 15,
    "overallProgress": 15,
    "levels": [
      {
        "id": 2001,
        "track_id": 102,
        "level_number": 1,
        "title": "API Design & FastAPI",
        "resources": [
          {
            "id": 6001,
            "level_id": 2001,
            "resource_type": "video",
            "title": "FastAPI Crash Course",
            "overview": "Setting up routers, dependencies, and Pydantic schemas.",
            "status": "completed"
          },
          {
            "id": 6002,
            "level_id": 2001,
            "resource_type": "article",
            "title": "RESTful API Best Practices",
            "overview": "Status codes, standard methods, and pagination.",
            "status": "not_started"
          }
        ]
      }
    ]
  }
];


export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate();

const handleRoleSelect = (trackId) => {
    // Navigate to the new page, appending the track ID to the URL
    navigate(`/role/${trackId}`);
    console.log(`Selected track ID: ${trackId}`);
  };
  return (
    <PageTransition className="mx-auto max-w-6xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <p className="label">Dashboard</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink-50">
          Welcome, {user.full_name.split(' ')[0]}
        </h1>
        {/* <p className="mt-2 max-w-2xl text-ink-400">
          This is the scaffolded entry point. Build the consultant flow (role
          picker, skills list, Smart Targeter) and the admin views (user list,
          heatmap, target review) on top of these cards.
        </p> */}
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {placeholders.map(({ icon: Icon, title, body }, i) => (
          <motion.div
            key={title}
            custom={i}
            initial="hidden"
            animate="show"
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="card p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-300">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-ink-50">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-400">{body}</p>
            <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-ink-800/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-ink-400">
              Coming soon
            </div>
          </motion.div>
        ))}
      </div>

      <SkillsCarousel enrolledTracks={mockData} onRoleSelect={handleRoleSelect} 
       />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-10 card p-6 text-sm text-ink-400"
      >
        Signed in as{' '}
        <span className="font-medium text-ink-200">{user.email}</span>
        {user.is_admin && (
          <span className="ml-2 rounded bg-brand-500/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-brand-300">
            Admin
          </span>
        )}
      </motion.div>
    </PageTransition>
  )
}
