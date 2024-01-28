import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
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
