export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Vouched",
  description: "A modern referral network",
  slogan: "Discover talented candidates vouchd by people you trust",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    // {
    //   title: "About",
    //   href: "/about",
    // },
    {
      title: "Profile",
      href: "/profile",
    },
  ],
  defaultHome: "/profile?tab=howitworks",
  checklistItems: [
    "Set up a shareable Vouched professional profile page",
    "Vouch for people you know and trust",
    "Specify custom terms when someone gets hired from your network",
  ],
  vouchPlaceholder: {
    message:
      "Enter vouch message include relevant skills and how you could help someone connect with this person (ex: I worked with John for 5 years at two different startups, and he's a great manager and leader of SaaS companies. I can help you get in contact with John via email or LinkedIn on request.",
    relationship:
      "Enter relationship (ex: coworker for five years, manager, etc)",
    skills:
      "Enter skills separated by a comma (ex: leadership, management, etc)",
  },
  tooltips: {
    vouch: {
      message:
        "This is the message that will be displayed on the vouch card. It should be a short message that describes your relationship with the person you are endorsing and why you are endorsing them.",
      relationship:
        "This is the relationship you have with the person you are endorsing. It should be a short description of how you know the person you are endorsing.",
    },
    profile: {
      title:
        "This is your professional title. It should be a short description of your professional background and expertise.",
      bio: "This is a short bio about yourself. This bio will be displayed on your public profile page.",
      agreement:
        "When visitors view your profile, they will be asked to agree to this text in order to view your Vouch network.",
      handle:
        "This is the unique handle that will be used to access your public profile page. It should be a short description of your name or professional title.",
    },
  },
}
