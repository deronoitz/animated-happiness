import { memo } from "react";

type MetricBoxProps = {
  count: number;
  title: string;
};

function MetricBox(props: MetricBoxProps) {
  const { count, title } = props;

  return (
    <div className="flex items-center flex-col px-1.5 pb-5 pt-4 bg-white rounded-lg shadow-small-box w-[90px] h-[90px]">
      <h2 className="text-4xl text-teal-green font-medium leading-11">
        {count}
      </h2>
      <p className="text-xxs tracking-[.14px] leading-[10px] text-center">
        {title}
      </p>
    </div>
  );
}

export default memo(MetricBox);
