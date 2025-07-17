import {
  LayoutDashboard,
  CalendarPlus,
  ClipboardList,
  UserCircle,
  AlarmClock,
  HelpCircle
} from 'lucide-react';

export const User_Routes = [
  {
    path: "/user",
    label: "Overview",
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    path: "/user/book-appointment",
    label: "Book Appointment",
    icon: <CalendarPlus className="w-5 h-5" />
  },
  {
    path: "/user/appointments",
    label: "My Appointments",
    icon: <ClipboardList className="w-5 h-5" />
  },
  {
    path: "/user/profile",
    label: "Profile",
    icon: <UserCircle className="w-5 h-5" />
  },
  {
    path: "/user/emergency",
    label: "Emergency",
    icon: <AlarmClock className="w-5 h-5" />
  },
  {
    path: "/user/faq",
    label: "FAQs",
    icon: <HelpCircle className="w-5 h-5" />
  }
];
