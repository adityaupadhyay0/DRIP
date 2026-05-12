'use client';

import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, color: 'text-green-500' },
    { name: 'Active Users', value: '12,482', icon: Users, color: 'text-blue-500' },
    { name: 'Affiliate Clicks', value: '842', icon: ShoppingCart, color: 'text-purple-500' },
    { name: 'Conversion Rate', value: '4.2%', icon: TrendingUp, color: 'text-orange-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold tracking-tighter mb-12 text-center md:text-left">Revenue Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((item) => (
          <div key={item.name} className="p-8 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-[2rem] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <item.icon className={item.color} size={24} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live</span>
            </div>
            <p className="text-3xl font-black mb-1">{item.value}</p>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{item.name}</h3>
          </div>
        ))}
      </div>

      <div className="p-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[3rem]">
        <h2 className="text-xl font-bold mb-8">Top Converting Retailers</h2>
        <div className="space-y-6">
          {['Zara', 'ASOS', 'H&M', 'Uniqlo'].map((brand, i) => (
            <div key={brand} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white dark:bg-black rounded-xl flex items-center justify-center font-bold border border-gray-100 dark:border-gray-800">{i+1}</div>
                <span className="font-bold">{brand}</span>
              </div>
              <div className="flex items-center gap-8">
                <div className="w-48 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden hidden md:block">
                  <div className="h-full bg-black dark:bg-white" style={{ width: `${80 - i*15}%` }} />
                </div>
                <span className="text-sm font-bold">₹{(50000 - i*10000).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
