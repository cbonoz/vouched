import { Separator } from "@radix-ui/react-separator"

import { Vouch } from "@/lib/types"
import { formatDate, isEmpty } from "@/lib/utils"

import BasicCard from "./BasicCard"

const VouchRow = ({ vouch }: { vouch: Vouch }) => {
  const fullName = `${vouch.firstName} ${vouch.lastName}`

  // Split skills by comma and strip whitespace
  const skills = vouch.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter((x) => !isEmpty(x))

  const titleRow = (
    <div className="flex justify-between">
      <div className="font-bold">{fullName}</div>
      <div>Vouched: {formatDate(vouch.createdAt, true)}</div>
    </div>
  )

  return (
    <BasicCard title={titleRow} className="p-4">
      <div>
        <div className="text-sm">
          <div className="my-1 font-bold">{vouch.message}</div>
          <hr />
          {!isEmpty(skills) && (
            <div className="my-2">
              {/* skill chips */}
              Skills:&nbsp;
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
          {!isEmpty(vouch.relationship) && (
            <div>Relationship: {vouch.relationship}</div>
          )}
          {/* <div>Vouched on: {formatDate(vouch.createdAt, true)}</div> */}
        </div>
      </div>
    </BasicCard>
  )
}
export default VouchRow
