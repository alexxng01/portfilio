import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    todayVisitors: 0,
    pageViews: {},
    topLocations: {},
    recentActivities: [],
    messages: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/stats');
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-cyan-400 text-xl">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Visitors */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/20 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-2">Total Visitors</p>
              <h3 className="text-3xl font-bold text-cyan-400">{stats.totalVisitors || 0}</h3>
            </div>
            <span className="text-3xl">👥</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">All time visits</p>
        </div>

        {/* Today Visitors */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg border border-green-500/30 shadow-lg hover:shadow-green-500/20 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-2">Today's Visitors</p>
              <h3 className="text-3xl font-bold text-green-400">{stats.todayVisitors || 0}</h3>
            </div>
            <span className="text-3xl">📅</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">Today's visits</p>
        </div>

        {/* Page Views */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg border border-blue-500/30 shadow-lg hover:shadow-blue-500/20 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-2">Total Page Views</p>
              <h3 className="text-3xl font-bold text-blue-400">
                {Object.values(stats.pageViews || {}).reduce((a, b) => a + b, 0)}
              </h3>
            </div>
            <span className="text-3xl">📄</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">All pages combined</p>
        </div>

        {/* New Messages */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-6 rounded-lg border border-yellow-500/30 shadow-lg hover:shadow-yellow-500/20 transition">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm mb-2">New Messages</p>
              <h3 className="text-3xl font-bold text-yellow-400">
                {stats.messages?.filter(m => !m.read).length || 0}
              </h3>
            </div>
            <span className="text-3xl">📧</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">Unread messages</p>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views Breakdown */}
        <div className="bg-slate-800 p-6 rounded-lg border border-cyan-500/20">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">📊 Page Views</h2>
          <div className="space-y-3">
            {Object.entries(stats.pageViews || {}).length > 0 ? (
              Object.entries(stats.pageViews).map(([page, views]) => (
                <div key={page} className="flex justify-between items-center">
                  <span className="text-gray-300">{page}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        style={{
                          width: `${
                            (views /
                              Math.max(
                                ...Object.values(stats.pageViews || {}),
                                1
                              )) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-cyan-400 font-bold w-12 text-right">{views}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No page views yet</p>
            )}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-slate-800 p-6 rounded-lg border border-cyan-500/20">
          <h2 className="text-xl font-bold text-cyan-400 mb-4">🌍 Top Locations</h2>
          <div className="space-y-3">
            {Object.entries(stats.topLocations || {}).length > 0 ? (
              Object.entries(stats.topLocations)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([location, count]) => (
                  <div key={location} className="flex justify-between items-center">
                    <span className="text-gray-300">{location || 'Unknown'}</span>
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-bold">
                      {count}
                    </span>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No location data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-slate-800 p-6 rounded-lg border border-cyan-500/20 max-h-96 overflow-y-auto">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 sticky top-0 bg-slate-800 pb-4">
            📈 Recent Activities
          </h2>
          <div className="space-y-2">
            {stats.recentActivities && stats.recentActivities.length > 0 ? (
              stats.recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-slate-700/50 p-3 rounded border border-slate-600 hover:border-cyan-400/50 transition"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-gray-300 text-sm">{activity.action}</p>
                      <p className="text-gray-500 text-xs mt-1">{activity.details}</p>
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No activities yet</p>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="bg-slate-800 p-6 rounded-lg border border-cyan-500/20 max-h-96 overflow-y-auto">
          <h2 className="text-xl font-bold text-cyan-400 mb-4 sticky top-0 bg-slate-800 pb-4">
            💬 Contact Form Submissions
          </h2>
          <div className="space-y-3">
            {stats.messages && stats.messages.length > 0 ? (
              stats.messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded border ${
                    message.read
                      ? 'bg-slate-700/30 border-slate-600'
                      : 'bg-cyan-500/10 border-cyan-500/50'
                  } hover:border-cyan-400/50 transition`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-cyan-400">{message.name}</p>
                        {!message.read && (
                          <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{message.email}</p>
                      <p className="text-sm text-gray-300 mt-1">{message.message}</p>
                    </div>
                    <span className="text-gray-500 text-xs whitespace-nowrap">
                      {new Date(message.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No messages yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
