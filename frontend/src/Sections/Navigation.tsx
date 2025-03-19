import { Outlet } from "react-router-dom";
import { Settings, House, GraduationCap, CalendarFold } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navigation() {
  const [selected, setSelected] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setSelected(0);
    } else if (location.pathname === "/myLearning") {
      setSelected(1);
    } else if (location.pathname === "/learningplan") {
      setSelected(2);
    } else if (location.pathname === "/settings") {
      setSelected(3);
    }
  }, [location.pathname]);

  const handleNavigation = (item: IconItem) => {
    if (item.index !== undefined && item.path) {
      setSelected(item.index);
      navigate(item.path);
    }
  };
  const iconSetup = "h-8 w-8";

  type IconItem = {
    icon: ReactNode;
    path?: string;
    index?: number;
  };
  const icons: Array<IconItem> = [
    { icon: <House className={iconSetup} />, path: "/dashboard" },
    { icon: <GraduationCap className={iconSetup} />, path: "/myLearning" },
    { icon: <CalendarFold className={iconSetup} />, path: "/learningPlan" },
    { icon: <Settings className={iconSetup} />, path: "/settings" },
  ];

  return (
    <div
      id="my-learning"
      className="flex  w-full min-h-screen pt-6 bg-[#FCF1CC]"
    >
      <div className="w-24 flex justify-center mt-20">
        <div className="flex flex-col gap-20">
          {icons.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavigation({ ...item, index })}
              style={{ cursor: "pointer" }}
              className={`flex items-center justify-center w-12 h-12 rounded-full ${selected == index ? "bg-amber-500 text-white" : ""}`}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
      <div className="container w-full h-[96vh] bg-white rounded-2xl lg:p-8 shadow-md shadow-gray-300">
        <Outlet />
      </div>
    </div>
  );
}
