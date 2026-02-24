import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts";
import { getStatusInfo } from "../../Utils";
import './Graph.css'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload) {
    return (
      <div className={`customToolTipStyle ${payload[0].payload.type}Tooltip`}>
        <div>
          <p>{label}</p>
          {(label !== 'Estatus Inicial' && label !== 'Caducado') &&
            <img className="iconStandardStyle" title={getStatusInfo(label, true)} src={getStatusInfo(label)} alt='icon'/>
          }
        </div>
        <p>{payload[0].payload.text}</p>
        <p>- {payload[0].payload.date} -</p>
      </div>
    );
  }

  return null;
};

const CustomizedDot = (props: any) => {
  const { cx, cy, r, stroke, payload } = props;
  const color = payload.color || stroke;

  return (
    <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth={4} fill={color}  />
  );
};

const LineGraph = ({ data }: {
  data: {
    name: string;
    uv: number;
    text: string;
    date: string;
    color?: string;
  }[]
}) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={600}
        height={400}
        data={data}
        margin={{
          top: 15,
          right: 4,
          left: 4,
          bottom: 4,
        }}
      >
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <Tooltip content={<CustomTooltip />} wrapperStyle={{ top: '-30px' }}/>
        <Line type='monotone' strokeOpacity={0.2} dataKey='uv' dot={<CustomizedDot />} activeDot={<CustomizedDot />}/>
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineGraph