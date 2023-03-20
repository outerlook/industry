import type {HandleEvent, Render, Workload} from './UserWorkload';
import {Popover} from 'antd';

export const WorkloadPile = (props: {
    workloads: Workload[];
    onClick?: HandleEvent<Workload> | undefined;
    renderTooltip?: Render<Workload> | undefined;
}) => {
    const {workloads, onClick, renderTooltip} = props;
    return (
        <div

            className={'grid grid-col gap-1'}
        >
            {workloads.map(w => (
                <Popover key={w.id} title={renderTooltip?.(w)}>
                    <div
                        onClick={() => onClick?.(w)}
                        className={`w-full rounded h-2 outline-1 outline-slate-400`}
                        style={{backgroundColor: w.color, cursor: onClick ? 'pointer' : ''}}
                    />
                </Popover>
            ))}
        </div>
    );
};
