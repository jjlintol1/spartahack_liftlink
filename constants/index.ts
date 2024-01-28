import { IDiscoverLink, ISidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: ISidebarLink[] = [
  // {
  //   imgURL: "/assets/icons/home.svg",
  //   route: "/",
  //   label: "Home",
  //   public: true,
  // },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
    public: true,
  },
  {
    imgURL: "/assets/icons/alarm-clock-check.svg",
    route: "/routine",
    label: "Workouts",
    public: true,
  },
  {
    imgURL: "/assets/icons/dumbbell.svg",
    route: "/exercise",
    label: "Exercises",
    public: true,
  },
  {
    imgURL: "/assets/icons/calendar.svg",
    route: "/schedule",
    label: "Schedules",
    public: true,
  },
  // {
  //   imgURL: "/assets/icons/user.svg",
  //   route: "/profile",
  //   label: "Profile",
  //   public: false,
  // },
  {
    imgURL: "/assets/icons/alarm-clock-plus.svg",
    route: "/create-routine",
    label: "Create routine",
    public: false,
  },
  {
    imgURL: "/assets/icons/calendar-plus.svg",
    route: "/create-schedule",
    label: "Create schedule",
    public: false,
  },
];

export const discoverLinks: IDiscoverLink[] = [
  {
    icon: "/assets/icons/line-chart.svg",
    label: "Workout Routines",
    route: "/"
  },
  {
    icon: "/assets/icons/dumbbell.svg",
    label: "Exercises",
    route: "/"
  },
  {
    icon: "/assets/icons/users.svg",
    label: "Community",
    route: "/"
  },
  {
    icon: "/assets/icons/calendar.svg",
    label: "Workout Splits",
    route: "/"
  },
]
