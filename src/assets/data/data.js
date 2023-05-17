import mail from "../../assets/mail.svg";
import display from "../../assets/display.svg";
import confess from "../../assets/confess.svg";
import cat from "../../assets/cat.svg";

const confessCategories = [
  {
    id: "1",
    title: "academics",
  },
  {
    id: "2",
    title: "canteen",
  },
  {
    id: "3",
    title: "friendship",
  },
  {
    id: "4",
    title: "relationship",
  },
  {
    id: "5",
    title: "roommates",
  },
  {
    id: "6",
    title: "career",
  },
  {
    id: "7",
    title: "faculty",
  },
  {
    id: "8",
    title: "events",
  },
];

const confessions = [
  {
    id: 1,
    confession:
      "I cheated on my final exam last semester and still feel guilty about it.",
  },
  {
    id: 2,
    confession:
      "I have a crush on my best friend's significant other, and it's tearing me apart.",
  },
  {
    id: 3,
    confession:
      "I stole my roommate's favorite hoodie and have been secretly wearing it for weeks.",
  },
  {
    id: 4,
    confession:
      "I pretended to be sick to skip a group project meeting because I didn't want to work with my lazy teammates.",
  },
  {
    id: 5,
    confession:
      "I accidentally broke a window in the library, but I blamed it on someone else to avoid the consequences.",
  },
  {
    id: 6,
    confession:
      "I regularly eavesdrop on conversations in the campus coffee shop just to entertain myself.",
  },
  {
    id: 7,
    confession:
      "I've been spreading rumors about a classmate out of jealousy, and I regret it deeply.",
  },
  {
    id: 8,
    confession:
      "I stole the mascot costume during a sports event and wore it to a rival school's pep rally.",
  },
  {
    id: 9,
    confession:
      "I used my professor's computer to change my final grade because I was afraid of failing the course.",
  },
  {
    id: 10,
    confession:
      "I've been leaving anonymous love notes in the library for a secret admirer, but it's all a made-up story.",
  },
];

const howItWorks = [
  {
    id: "1",
    title: "Get Login Link",
    image: mail,
    description:
      "Gain access to an exclusive gateway by simply providing your DAIICT Roll number. Experience the convenience of receiving the login link directly in your email inbox, streamlining the process and ensuring seamless connectivity.",
  },
  {
    id: "2",
    title: "Anonymity",
    image: cat,

    description:
      "Rest assured, your email serves solely as a verification mechanism for DAIICT students. We uphold a steadfast commitment to privacy, refraining from establishing any user databases. Your information remains confidential, reinforcing a culture of anonymity and fostering a trusted environment.",
  },
  {
    id: "3",
    title: "Confess",
    image: confess,

    description:
      "Upon logging in, indulge in a cathartic experience where you can freely express your emotions and share stories. Embrace the liberating power of anonymity as you unburden yourself, without the fear of judgment or disclosure. Here, within the confines of our platform, your confessions shall find solace and resonate with others.",
  },
  {
    id: "4",
    title: "How We Display It?",
    image: display,

    description:
      "Our platform ensures the complete anonymity of confessions, safeguarding individual identities throughout the process. Our commitment to privacy extends to our backend systems, as we refrain from storing or accessing any user-specific information. Confessions are attributed solely to the respective batch numbers, preserving anonymity while providing a sense of collective representation.",
  },
];
export { confessCategories, confessions, howItWorks };