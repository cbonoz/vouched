import BasicCard from "./BasicCard"

const About = () => {
  return (
    <div>
      <BasicCard title="Welcome to Vouched!" className="w-full p-6">
        <div className="my-4">
          Vouched is a platform that allows you to vouch people you know and
          trust.{" "}
        </div>

        <div className="my-4">
          <div className="text-xl font-bold">How it works</div>
          <div className="my-4">
            <div className="text-lg font-bold">Vouches</div>
            <div>
              Vouches are a way to vouch for someone you know. When you vouch
              someone, you are saying that you trust them. You can vouch someone
              for a specific skill, or for their character.
            </div>
          </div>

          <div className="my-4">
            <div className="text-lg font-bold">Profile page</div>
            <div>
              A profile page is defined by a unique handle you can define from
              the Manage tab. You can share your profile page with others, and
              they can request access to your vouch or vouch network using terms
              of access that you specify (ex: 10% fee if you hire someone from
              my network, I get a return favor X, etc.).
            </div>
          </div>

          <div className="my-4">
            <div className="text-lg font-bold">Privacy</div>
            <div>
              In order to vouch for someone, you must be logged in and your
              account must also be active. Users requesting access to your
              Vouched network are also required to have accounts.
            </div>
          </div>
        </div>
      </BasicCard>
    </div>
  )
}

export default About
