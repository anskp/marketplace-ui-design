import React, { useState } from 'react';
import { PricePoint } from '../types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface AssetChartProps {
  data: PricePoint[];
  category: string;
}

export const AssetChart: React.FC<AssetChartProps> = ({ data, category }) => {
  const [timeframe, setTimeframe] = useState<'1M' | '3M' | '6M' | '1Y'>('1Y');

  const strokeColor =
    category === 'carbon'
      ? '#16a34a'
      : category === 'real_estate'
      ? '#2563eb'
      : category === 'fine_art'
      ? '#d97706'
      : '#0284c7';

  const fillColor =
    category === 'carbon'
      ? '#dcfce7'
      : category === 'real_estate'
      ? '#dbeafe'
      : category === 'fine_art'
      ? '#fef3c7'
      : '#e0f2fe';

  return (
    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Secondary Trading Price Valuation Index
        </h4>

        <div className="flex bg-slate-100 rounded-lg p-0.5 border border-slate-200 text-xs">
          {(['1M', '3M', '6M', '1Y'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded font-medium transition ${
                timeframe === tf ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[180px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`chartColor-${category}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={fillColor} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={strokeColor}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#chartColor-${category})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
