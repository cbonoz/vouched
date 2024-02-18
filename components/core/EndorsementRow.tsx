import { Endorsement } from "@/lib/types"
import { formatDate } from "@/lib/utils"

import BasicCard from "./BasicCard"

const EndorsementRow = ({ endorsement }: { endorsement: Endorsement }) => {
  const fullName = `${endorsement.firstName} ${endorsement.lastName}`

  // Split skills by comma and strip whitespace
  const skills = endorsement.skills.split(",").map((skill) => skill.trim())

  return (
    <BasicCard title={fullName} className="p-4">
      <div>
        <div>
          <div className="my-2">{endorsement.message}</div>
          <div className="my-2">
            {/* skill chips */}
            {skills.map((skill, i) => (
              <span
                key={i}
                className="mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
          <div>Relationship: {endorsement.relationship}</div>
          <div>Endorsed on: {formatDate(endorsement.createdAt, true)}</div>
        </div>
      </div>
    </BasicCard>
  )
}
export default EndorsementRow
