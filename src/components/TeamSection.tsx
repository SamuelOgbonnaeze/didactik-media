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
      className={`inline-block bg-white text-center relative cursor-default ${
        isCEO 
          ? "rounded-2xl border-2 border-primary shadow-[0_8px_32px_rgba(83,67,253,0.18)] hover:shadow-[0_12px_40px_rgba(83,67,253,0.28)] hover:-translate-y-1 px-7 py-5 min-w-[220px] max-w-[280px]" 
          : "rounded-xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.13)] hover:-translate-y-0.5 px-5 py-3.5 min-w-[160px] max-w-[220px]"
      }`}
      style={{
        transition: "box-shadow 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* CEO gradient badge */}
      {isCEO && (
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#5343FD] to-[#3FD7FF] text-white text-[10px] font-bold tracking-[0.08em] px-3 py-[3px] rounded-b-lg uppercase"
        >
          Founder & CEO
        </div>
      )}

      {/* Avatar */}
      <div className={`flex justify-center mb-2.5 ${isCEO ? "mt-4.5" : "mt-0"}`}>
        {member.photo && !imgError ? (
          <img
            src={member.photo}
            alt={member.name}
            onError={() => setImgError(true)}
            className={`rounded-full object-cover shrink-0 ${
              isCEO ? "w-[72px] h-[72px] border-[3px] border-[#5343FD]" : "w-[52px] h-[52px] border-2 border-slate-300"
            }`}
          />
        ) : (
          <div
            className={`flex items-center justify-center rounded-full text-white font-bold shrink-0 ${
              isCEO 
                ? "w-[72px] h-[72px] text-2xl bg-gradient-to-br from-[#5343FD] to-[#3FD7FF]" 
                : "w-[52px] h-[52px] text-lg bg-gradient-to-br from-slate-300 to-slate-400"
            }`}
          >
            {getInitials(member.name)}
          </div>
        )}
      </div>

      {/* Name */}
      <p
        className={`font-bold text-gray-900 m-0 mb-1 leading-snug ${
          isCEO ? "text-[15px]" : "text-[13px]"
        }`}
      >
        {member.name}
      </p>

      {/* Role */}
      <p
        className={`text-[#5343FD] font-medium m-0 mb-1 ${
          isCEO ? "text-xs" : "text-[11px]"
        }`}
      >
        {member.role.replace("Founder & CEO", "").trim() || member.role}
      </p>

      {/* Credentials */}
      {member.credential && (
        <p
          className="text-[10px] text-gray-400 m-0 leading-relaxed"
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
    <div className="overflow-x-auto overflow-y-visible pb-8 pt-4 w-full">
      <div className="min-w-[768px] pb-4 flex justify-center mx-auto">
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
      <div className="flex justify-center mb-8 md:mb-10 px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-white p-6 md:p-10 rounded-2xl shadow-xl z-10 max-w-4xl w-full border-2 border-primary"
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
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-6 md:p-8 rounded-xl border border-gray-200 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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
              className={`px-6 py-2.5 font-semibold text-sm cursor-pointer border-none active:scale-[0.98] ${
                view === "grid"
                  ? "bg-gradient-to-br from-[#5343FD] to-[#3FD7FF] text-white"
                  : "bg-transparent text-gray-500"
              }`}
              aria-pressed={view === "grid"}
            >
              Grid View
            </button>
            <div style={{ width: "1px", background: "#E5E7EB" }} />
            <button
              id="team-org-chart-view-btn"
              onClick={() => setView("org")}
              className={`px-6 py-2.5 font-semibold text-sm cursor-pointer border-none active:scale-[0.98] ${
                view === "org"
                  ? "bg-gradient-to-br from-[#5343FD] to-[#3FD7FF] text-white"
                  : "bg-transparent text-gray-500"
              }`}
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
