import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tree, TreeNode } from "react-organizational-chart";
import ImageWithSkeleton from "./ImageWithSkeleton";

// ─── Team Data ────────────────────────────────────────────────────────────────

interface TeamMember {
  id: string;
  name: string;
  role: string;
  credential?: string;
  photo?: string;
  children?: TeamMember[];
}

const teamData: TeamMember = {
  id: "ceo",
  name: "Ememobong Attah",
  role: "Founder & CEO",
  credential:
    "LL.B Law, Babcock University | IP & Media Strategist | CP Innovate Grant Finalist 2024",
  photo: "/images/founder-img-1.jpeg",
  children: [
    {
      id: "archivist-1",
      name: "Aderonke Awolaja",
      role: "Archivist & Process Coordinator",
      credential: "B.A., Ekiti State University",
    },
    {
      id: "archivist-2",
      name: "Daphne Soyinka",
      role: "Archivist & Client Relations",
      credential: "B.A., Federal University of Agriculture, Abeokuta",
    },
    {
      id: "archivist-3",
      name: "Tamaraebiekiye Bestman",
      role: "Archivist & Institutional Liaison",
      credential: "LL.B Law, Babcock University",
    },
  ],
};

// ─── Initials Avatar Helper ───────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ─── OrgCard Component ────────────────────────────────────────────────────────

interface OrgCardProps {
  member: TeamMember;
  isCEO?: boolean;
}

function OrgCard({ member, isCEO = false }: OrgCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      style={{
        display: "inline-block",
        background: "white",
        borderRadius: isCEO ? "16px" : "12px",
        border: isCEO ? "2px solid #5343FD" : "1px solid #E2E8F0",
        boxShadow: isCEO
          ? "0 8px 32px rgba(83,67,253,0.18)"
          : "0 2px 12px rgba(0,0,0,0.08)",
        padding: isCEO ? "20px 28px" : "14px 20px",
        minWidth: isCEO ? "220px" : "160px",
        maxWidth: isCEO ? "280px" : "220px",
        textAlign: "center",
        position: "relative",
        transition: "box-shadow 0.2s, transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = isCEO
          ? "0 12px 40px rgba(83,67,253,0.28)"
          : "0 6px 20px rgba(0,0,0,0.13)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = isCEO
          ? "0 8px 32px rgba(83,67,253,0.18)"
          : "0 2px 12px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* CEO gradient badge */}
      {isCEO && (
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(135deg, #5343FD, #3FD7FF)",
            color: "white",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            padding: "3px 12px",
            borderRadius: "0 0 8px 8px",
            textTransform: "uppercase",
          }}
        >
          Founder & CEO
        </div>
      )}

      {/* Avatar */}
      <div
        style={{
          marginTop: isCEO ? "18px" : "0",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {member.photo && !imgError ? (
          <img
            src={member.photo}
            alt={member.name}
            onError={() => setImgError(true)}
            style={{
              width: isCEO ? "72px" : "52px",
              height: isCEO ? "72px" : "52px",
              borderRadius: "50%",
              objectFit: "cover",
              border: isCEO ? "3px solid #5343FD" : "2px solid #CBD5E1",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: isCEO ? "72px" : "52px",
              height: isCEO ? "72px" : "52px",
              borderRadius: "50%",
              background: isCEO
                ? "linear-gradient(135deg, #5343FD, #3FD7FF)"
                : "linear-gradient(135deg, #CBD5E1, #94A3B8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: isCEO ? "24px" : "18px",
              fontFamily: "Inter, sans-serif",
              flexShrink: 0,
            }}
          >
            {getInitials(member.name)}
          </div>
        )}
      </div>

      {/* Name */}
      <p
        style={{
          fontWeight: 700,
          fontSize: isCEO ? "15px" : "13px",
          color: "#111827",
          margin: "0 0 4px 0",
          lineHeight: 1.3,
          fontFamily: "Inter, sans-serif",
        }}
      >
        {member.name}
      </p>

      {/* Role */}
      <p
        style={{
          fontSize: isCEO ? "12px" : "11px",
          color: "#5343FD",
          fontWeight: 500,
          margin: "0 0 4px 0",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {member.role.replace("Founder & CEO", "").trim() || member.role}
      </p>

      {/* Credentials */}
      {member.credential && (
        <p
          style={{
            fontSize: "10px",
            color: "#9CA3AF",
            margin: 0,
            lineHeight: 1.4,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {member.credential.split("|")[0].trim()}
        </p>
      )}
    </div>
  );
}

// ─── Org Chart View ───────────────────────────────────────────────────────────

function OrgChartView() {
  return (
    <div
      style={{
        overflowX: "auto",
        overflowY: "visible",
        paddingBottom: "2rem",
        paddingTop: "1rem",
      }}
    >
      <div style={{ minWidth: "640px", paddingBottom: "1rem" }}>
        <Tree
          lineWidth="2px"
          lineColor="#CBD5E1"
          lineBorderRadius="10px"
          label={<OrgCard member={teamData} isCEO />}
        >
          {teamData.children?.map((child) => (
            <TreeNode key={child.id} label={<OrgCard member={child} />} />
          ))}
        </Tree>
      </div>
    </div>
  );
}

// ─── Grid View ────────────────────────────────────────────────────────────────

interface GridViewProps {
  isInView: boolean;
}

function GridView({ isInView }: GridViewProps) {
  const allMembers = [teamData, ...(teamData.children ?? [])];

  return (
    <div>
      {/* Founder Feature Card */}
      <div className="flex justify-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-2xl shadow-xl z-10 max-w-4xl w-full border-2 border-primary"
        >
          <ImageWithSkeleton
            src={teamData.photo!}
            alt={teamData.name}
            className="w-40 h-40 rounded-full object-cover flex-shrink-0 border-4 border-secondary shadow-md"
            skeletonClassName="rounded-full"
          />
          <div className="text-center md:text-left flex-1">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full mb-3">
              Founder & CEO
            </span>
            <h3 className="text-3xl font-serif font-bold mb-2 text-gray-900">
              {teamData.name}
            </h3>
            <p className="text-xl text-primary font-medium mb-3">
              {teamData.role}
            </p>
            <p className="text-base text-gray-600 font-medium">
              {teamData.credential}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allMembers.slice(1).map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              delay: 0.2 + index * 0.15,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="bg-white p-8 rounded-xl border border-gray-200 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Initials avatar */}
            <div className="flex justify-center mb-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                style={{
                  background: "linear-gradient(135deg, #CBD5E1, #94A3B8)",
                }}
              >
                {getInitials(member.name)}
              </div>
            </div>
            <h4 className="text-xl font-bold mb-2 text-gray-900">
              {member.name}
            </h4>
            <p className="text-primary font-medium mb-2">{member.role}</p>
            <p className="text-sm text-gray-600 font-medium">
              {member.credential}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── TeamSection (exported) ───────────────────────────────────────────────────

export function TeamSection() {
  const [view, setView] = useState<"grid" | "org">("grid");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-12 bg-bg-alt">
      <div className="container">
        <h2 className="text-4xl font-serif font-bold mb-6 text-center">
          Our Team
        </h2>

        {/* ── Toggle Buttons ── */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
            role="group"
            aria-label="View toggle"
          >
            <button
              id="team-grid-view-btn"
              onClick={() => setView("grid")}
              style={{
                padding: "10px 24px",
                fontWeight: 600,
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                border: "none",
                transition: "all 0.2s",
                background:
                  view === "grid"
                    ? "linear-gradient(135deg, #5343FD, #3FD7FF)"
                    : "transparent",
                color: view === "grid" ? "white" : "#6B7280",
              }}
              aria-pressed={view === "grid"}
            >
              Grid View
            </button>
            <div style={{ width: "1px", background: "#E5E7EB" }} />
            <button
              id="team-org-chart-view-btn"
              onClick={() => setView("org")}
              style={{
                padding: "10px 24px",
                fontWeight: 600,
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                border: "none",
                transition: "all 0.2s",
                background:
                  view === "org"
                    ? "linear-gradient(135deg, #5343FD, #3FD7FF)"
                    : "transparent",
                color: view === "org" ? "white" : "#6B7280",
              }}
              aria-pressed={view === "org"}
            >
              Org Chart View
            </button>
          </div>
        </div>

        {/* ── Views ── */}
        {view === "grid" ? (
          <GridView isInView={isInView} />
        ) : (
          <>
            {/* Mobile: hide org chart */}
            <div className="block md:hidden text-center py-12">
              <div className="inline-flex flex-col items-center gap-3 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012 2v2zm0-10a2 2 0 01-2-2H5a2 2 0 01-2 2v2a2 2 0 002 2h2a2 2 0 002-2V7zm6 10a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012 2v2z"
                  />
                </svg>
                <p className="font-semibold text-gray-700">
                  Org chart available on larger screens
                </p>
                <p className="text-sm text-gray-400">
                  Switch to Grid View to see the team on mobile.
                </p>
              </div>
            </div>

            {/* Desktop: show org chart */}
            <div className="hidden md:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <OrgChartView />
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default TeamSection;
