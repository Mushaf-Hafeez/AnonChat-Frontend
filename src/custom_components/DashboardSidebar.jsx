import { Link } from "react-router-dom";

const DashboardSidebar = () => {
  return (
    <aside className="w-2/12 h-full p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="col-center gap-2 items-start">
        <Link>Departments</Link>
        <Link>CR/GR Management</Link>
        <Link>user reports</Link>
        <Link>Settings</Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
