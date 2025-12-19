import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import RevenueTrendChart from "../../components/analytics/RevenueTrendChart";
import CustomerGrowthChart from "../../components/analytics/CustomerGrowthChart";
import ProductDistributionChart from "../../components/analytics/ProductDistributionChart";
import SalesPerformanceChart from "../../components/analytics/SalesPerformanceChart";
import SalesByRegionChart from "../../components/analytics/SalesByRegionChart";
import QuarterlyRevenueChart from "../../components/analytics/QuarterlyRevenueChart";
import PerformanceMetricsChart from "../../components/analytics/PerformanceMetricsChart";
import StackedBarChart from "../../components/analytics/StackedBarChart";
import MixedChart from "../../components/analytics/MixedChart";
import ScatterChart from "../../components/analytics/ScatterChart";
import HeatmapChart from "../../components/analytics/HeatmapChart";
import GaugeChart from "../../components/analytics/GaugeChart";
import BubbleChart from "../../components/analytics/BubbleChart";
import CandlestickChart from "../../components/analytics/CandlestickChart";
import TreemapChart from "../../components/analytics/TreemapChart";
import PolarAreaChart from "../../components/analytics/PolarAreaChart";
import FunnelChart from "../../components/analytics/FunnelChart";
import AreaChart from "../../components/analytics/AreaChart";

export default function Q() {
  // Stats Cards Data
  const stats = [
    { title: "Total Revenue", value: "$1,420,000", change: "+12.5%", trend: "up", color: "text-green-600" },
    { title: "Total Customers", value: "12,450", change: "+8.2%", trend: "up", color: "text-green-600" },
    { title: "Active Orders", value: "1,234", change: "-3.1%", trend: "down", color: "text-red-600" },
    { title: "Conversion Rate", value: "24.8%", change: "+5.4%", trend: "up", color: "text-green-600" },
  ];

  return (
    <>
      <PageMeta
        title="Q Analytics Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="Business Intelligence and Analytics Dashboard"
      />
      <PageBreadcrumb pageTitle="Q Analytics Dashboard" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              {stat.title}
            </p>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </h3>
              <span className={`text-sm font-semibold ${stat.color}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {/* Row 1: Revenue Trend */}
        <ComponentCard title="Revenue Trend Analysis">
          <RevenueTrendChart />
        </ComponentCard>

        {/* Row 2: Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard title="Customer Growth">
            <CustomerGrowthChart />
          </ComponentCard>
          <ComponentCard title="Product Distribution">
            <ProductDistributionChart />
          </ComponentCard>
        </div>

        {/* Row 3: Sales Performance */}
        <ComponentCard title="Quarterly Sales Performance">
          <SalesPerformanceChart />
        </ComponentCard>

        {/* Row 4: Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard title="Sales by Region">
            <SalesByRegionChart />
          </ComponentCard>
          <ComponentCard title="Quarterly Revenue Distribution">
            <QuarterlyRevenueChart />
          </ComponentCard>
        </div>

        {/* Row 5: Performance Metrics */}
        <ComponentCard title="Department Performance Metrics">
          <PerformanceMetricsChart />
        </ComponentCard>

        {/* Row 6: Stacked Bar Chart */}
        <ComponentCard title="Monthly Sales by Product (Stacked)">
          <StackedBarChart />
        </ComponentCard>

        {/* Row 7: Mixed Chart */}
        <ComponentCard title="Revenue vs Orders (Mixed Chart)">
          <MixedChart />
        </ComponentCard>

        {/* Row 8: Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard title="Marketing vs Revenue (Scatter)">
            <ScatterChart />
          </ComponentCard>
          <ComponentCard title="Weekly Activity Heatmap">
            <HeatmapChart />
          </ComponentCard>
        </div>

        {/* Row 9: Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard title="Performance Gauge">
            <GaugeChart />
          </ComponentCard>
          <ComponentCard title="Marketing ROI (Bubble Chart)">
            <BubbleChart />
          </ComponentCard>
        </div>

        {/* Row 10: Candlestick Chart */}
        <ComponentCard title="Price Movement (Candlestick)">
          <CandlestickChart />
        </ComponentCard>

        {/* Row 11: Two Column Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ComponentCard title="Product Sales Treemap">
            <TreemapChart />
          </ComponentCard>
          <ComponentCard title="Department Distribution (Polar Area)">
            <PolarAreaChart />
          </ComponentCard>
        </div>

        {/* Row 12: Funnel Chart */}
        <ComponentCard title="Sales Funnel Conversion">
          <FunnelChart />
        </ComponentCard>

        {/* Row 13: Stacked Area Chart */}
        <ComponentCard title="Sales Channels (Stacked Area)">
          <AreaChart />
        </ComponentCard>
      </div>
    </>
  );
}
