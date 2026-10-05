"use client"

import { SectionWrapper } from "@/components/ui/section-wrapper"
import type { AgentRecord } from "./types"
import { AgentCard } from "./agent-card"

interface AgentsGridProps {
  agents: AgentRecord[]
  onBook: (agent: AgentRecord) => void
}

export function AgentsGrid({ agents, onBook }: AgentsGridProps) {
  return (
    <SectionWrapper className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onBook={onBook} />
        ))}
      </div>
    </SectionWrapper>
  )
}
