import { useState } from "react";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import CreateUserForm from "../components/auth/CreateUserForm";

type TabType = "createUser";

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState<TabType>("createUser");

  const getButtonClass = (tab: TabType) =>
    selectedTab === tab
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <>
      <PageMeta
        title="Admin | TailAdmin - React.js Admin Dashboard Template"
        description="Admin page for managing users"
      />
      <PageBreadcrumb pageTitle="Admin" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-3">
            User Management
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage user accounts and permissions
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
            <button
              onClick={() => setSelectedTab("createUser")}
              className={`px-4 py-2 font-medium rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white transition-colors ${getButtonClass(
                "createUser"
              )}`}
            >
              Create User
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {selectedTab === "createUser" && <CreateUserForm />}
        </div>
      </div>
    </>
  );
}

