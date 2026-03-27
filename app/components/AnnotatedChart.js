'use client'

import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts'

function CustomDot(props) {
  const { cx, cy, index, dataLength, value, color } = props
  if (index !== dataLength - 1) return null
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill={color} stroke="white" strokeWidth={2.5} />
      <rect
        x={cx - 28} y={cy - 36}
        width={56} height={20}
        rx={4}
        fill={color}
      />
      <text
        x={cx} y={cy - 22}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fill="white"
      >
        {value != null ? value : ''}
      </text>
    </g>
  )
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div style={{
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      padding: '8px 12px',
      fontSize: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    }}>
      <div style={{ color: '#7a90aa', marginBottom: '2px' }}>{label}</div>
      <div style={{ fontWeight: 700, color: '#0f1e35' }}>
        {payload[0].value != null ? payload[0].value : 'n/a'}
      </div>
    </div>
  )
}

export default function AnnotatedChart({ dates, series, target, color = '#378ADD', unit = '', height = 200, dark = false }) {
  const data = dates.map((d, i) => ({ date: d, value: series[i] ?? null }))

  // Show annual x-axis ticks only
  const xTicks = dates.length <= 15 ? dates : dates.filter((_, i) => i % 12 === 0)
  const lastValue = series[series.length - 1]

  return (
    <div style={{ width: '100%', height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 40, right: 20, bottom: 0, left: -8 }}>
          <XAxis
            dataKey="date"
            ticks={xTicks}
            tick={{ fontSize: 10, fill: dark ? 'rgba(255,255,255,0.35)' : '#a0aec0' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: dark ? 'rgba(255,255,255,0.35)' : '#a0aec0' }}
            axisLine={false}
            tickLine={false}
            width={36}
            domain={["auto", "auto"]}
          />
          {target != null && (
            <ReferenceLine
              y={target}
              stroke="#38a169"
              strokeDasharray="5 4"
              strokeWidth={1.5}
              label={{
                value: `Target ${target}%`,
                position: 'insideTopRight',
                fontSize: 10,
                fill: dark ? '#6ee7a0' : '#38a169',
                fontWeight: 600,
              }}
            />
          )}
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={(props) => (
              <CustomDot
                {...props}
                dataLength={data.length}
                value={lastValue}
                color={color}
              />
            )}
            activeDot={{ r: 5, fill: color, stroke: 'white', strokeWidth: 2 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
